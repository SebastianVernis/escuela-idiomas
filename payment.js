// Payment JavaScript
let stripe;
let elements;
let cardElement;
let selectedPackage = null;
let selectedPaymentMethod = null;

// Configuración de Stripe (reemplazar con tu clave pública)
const STRIPE_PUBLIC_KEY = 'pk_test_...'; // Tu clave pública de Stripe

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Payment page loaded');
    loadAvailablePackages();
    initializeStripe();
    handleUrlParams();
});

// Cargar paquetes disponibles
async function loadAvailablePackages() {
    try {
        const response = await fetch('/backend/api/payments/packages', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayPackages(data.packages);
        } else {
            console.error('Error loading packages');
            showError('Error cargando los paquetes disponibles');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión');
    }
}

// Mostrar paquetes en la interfaz
function displayPackages(packages) {
    const packagesGrid = document.getElementById('packagesGrid');
    packagesGrid.innerHTML = '';

    packages.forEach((pkg, index) => {
        const isPopular = index === 1; // Marcar el segundo paquete como popular
        
        const packageCard = document.createElement('div');
        packageCard.className = `package-card ${isPopular ? 'popular' : ''}`;
        packageCard.onclick = () => selectPackage(pkg);
        
        packageCard.innerHTML = `
            <div class="package-header">
                <h3 class="package-name">${pkg.nombre}</h3>
                <div class="package-price">
                    <span class="currency">$</span>${pkg.precio.toLocaleString()}
                    <span class="currency">MXN</span>
                </div>
                <div class="package-duration">por ${pkg.duracion_meses} mes${pkg.duracion_meses > 1 ? 'es' : ''}</div>
            </div>
            
            <p class="package-description">${pkg.descripcion}</p>
            
            <ul class="package-features">
                <li><i class="fas fa-check"></i> ${pkg.cursos || 'Acceso a cursos'}</li>
                <li><i class="fas fa-check"></i> ${pkg.total_libros} libros digitales</li>
                <li><i class="fas fa-check"></i> Grupos de conversación</li>
                <li><i class="fas fa-check"></i> Soporte 24/7</li>
            </ul>
            
            <button class="package-select-btn">
                Seleccionar Plan
            </button>
        `;
        
        packagesGrid.appendChild(packageCard);
    });
}

// Seleccionar paquete
function selectPackage(pkg) {
    selectedPackage = pkg;
    
    // Actualizar UI
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Mostrar información del paquete seleccionado
    const selectedPackageDiv = document.getElementById('selectedPackage');
    selectedPackageDiv.innerHTML = `
        <h3>${pkg.nombre}</h3>
        <p>${pkg.descripcion}</p>
        <div class="price">$${pkg.precio.toLocaleString()} MXN</div>
    `;
    
    // Mostrar métodos de pago
    document.getElementById('packageSelection').style.display = 'none';
    document.getElementById('paymentMethods').style.display = 'block';
}

// Seleccionar método de pago
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Actualizar UI
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Marcar radio button
    document.getElementById(method).checked = true;
    
    // Habilitar botón de continuar
    document.getElementById('proceedBtn').disabled = false;
}

// Proceder al pago
function proceedToPayment() {
    if (!selectedPackage || !selectedPaymentMethod) {
        showError('Por favor selecciona un paquete y método de pago');
        return;
    }
    
    document.getElementById('paymentMethods').style.display = 'none';
    
    if (selectedPaymentMethod === 'stripe') {
        document.getElementById('stripePayment').style.display = 'block';
        setupStripeForm();
    } else if (selectedPaymentMethod === 'clip') {
        document.getElementById('clipPayment').style.display = 'block';
        // Opcional: podríamos iniciar automáticamente processClipPayment()
    }
}

// Inicializar Stripe
function initializeStripe() {
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe(STRIPE_PUBLIC_KEY);
        elements = stripe.elements();
        
        // Crear elemento de tarjeta
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
            },
        });
    }
}

// Configurar formulario de Stripe
function setupStripeForm() {
    if (cardElement) {
        cardElement.mount('#card-element');
        
        cardElement.on('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
        
        // Manejar envío del formulario
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', handleStripePayment);
    }
}

// Procesar pago con Stripe
async function handleStripePayment(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-payment');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    // Deshabilitar botón y mostrar spinner
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    
    try {
        // Crear PaymentIntent en el servidor
        // Metadatos para enlazar en el webhook (usuario/curso/paquete)
        const usuarioId = getLoggedUserId();
        const cursoId = getCourseIdFromUrl();
        const paqueteId = selectedPackage?.id;

        const response = await fetch('/backend/api/payments/create-stripe-intent', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package_id: paqueteId,
                amount: selectedPackage.precio,
                // Importante: el backend debe propagar estos metadatos al PaymentIntent de Stripe
                metadata: {
                    usuarioId: String(usuarioId || ''),
                    cursoId: String(cursoId || ''),
                    paqueteId: String(paqueteId || '')
                }
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Confirmar pago con Stripe
            const {error} = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: document.getElementById('cardholder-name').value,
                        email: document.getElementById('email').value,
                    }
                }
            });
            
            if (error) {
                showError(error.message);
                resetPaymentButton();
            } else {
                // Pago exitoso
                showPaymentSuccess();
            }
        } else {
            showError(data.message || 'Error procesando el pago');
            resetPaymentButton();
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión');
        resetPaymentButton();
    }
}

// Procesar pago con Clip: crea checkout y redirige
async function processClipPayment() {
    if (!selectedPackage) {
        showError('Selecciona un paquete antes de continuar');
        return;
    }
    showLoading(true);
    try {
        const usuarioId = getLoggedUserId();
        const cursoId = getCourseIdFromUrl();
        const paqueteId = selectedPackage.id;
        const response = await fetch('/backend/api/payments/create-clip-payment', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package_id: paqueteId,
                amount: selectedPackage.precio,
                course_id: cursoId,
                metadata: {
                    usuarioId: String(usuarioId || ''),
                    cursoId: String(cursoId || ''),
                    paqueteId: String(paqueteId || '')
                }
            })
        });
        const data = await response.json();
        if (response.ok && data.payment_url) {
            window.location.href = data.payment_url;
        } else {
            showError(data.message || 'Error creando el pago con Clip');
        }
    } catch (err) {
        console.error(err);
        showError('Error de conexión con Clip');
    } finally {
        showLoading(false);
    }
}


// Reintentar pago
function retryPayment() {
    document.getElementById('paymentError').style.display = 'none';
    document.getElementById('paymentMethods').style.display = 'block';
    selectedPaymentMethod = null;
    
    // Resetear selección de método de pago
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
        radio.checked = false;
    });
    document.getElementById('proceedBtn').disabled = true;
}

// Mostrar éxito del pago
function showPaymentSuccess() {
    document.getElementById('stripePayment').style.display = 'none';
    document.getElementById('clipPayment').style.display = 'none';
    document.getElementById('paymentSuccess').style.display = 'block';
}

// Mostrar error
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('stripePayment').style.display = 'none';
    document.getElementById('clipPayment').style.display = 'none';
    document.getElementById('paymentError').style.display = 'block';
}

// Resetear botón de pago
function resetPaymentButton() {
    const submitButton = document.getElementById('submit-payment');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    spinner.style.display = 'none';
}

// Mostrar/ocultar loading
function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

// Obtener token de autenticación
function getAuthToken() {
    // En una implementación real, obtendrías esto del localStorage o cookies
    return localStorage.getItem('auth_token') || 'demo_token';
}

// Obtener usuario logueado (para metadata del PaymentIntent)
function getLoggedUserId() {
    try {
        const user = JSON.parse(localStorage.getItem('user_data'));
        return user?.id || null;
    } catch (_) {
        return null;
    }
}

// Obtener curso desde parámetros de URL (ej. ?cursoId=1)
function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCurso = urlParams.get('cursoId') || urlParams.get('course_id');
    return fromCurso ? Number(fromCurso) : null;
}

// Manejar parámetros de URL para confirmación de pago
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    
    if (paymentStatus === 'success') {
        showPaymentSuccess();
    } else if (paymentStatus === 'error') {
        const errorMsg = urlParams.get('error_message') || 'Error en el pago';
        showError(errorMsg);
    }
}

// Verificar parámetros de URL al cargar
// Nota: handleUrlParams() ya se invoca al cargar la página arriba

// Función para simular datos de paquetes (para demo)
function loadDemoPackages() {
    const demoPackages = [
        {
            id: 1,
            nombre: "Paquete Básico",
            descripcion: "Acceso a grupos conversacionales y biblioteca básica",
            precio: 1200,
            duracion_meses: 1,
            cursos: "Grupos Conversacionales",
            total_libros: 15
        },
        {
            id: 2,
            nombre: "Paquete Premium",
            descripcion: "Grupos conversacionales + clases individuales + biblioteca completa",
            precio: 2500,
            duracion_meses: 1,
            cursos: "Grupos + Clases Individuales",
            total_libros: 45
        },
        {
            id: 3,
            nombre: "Paquete Certificación",
            descripcion: "Preparación completa para TOEFL + materiales especializados",
            precio: 3000,
            duracion_meses: 3,
            cursos: "Preparación TOEFL",
            total_libros: 25
        }
    ];
    
    displayPackages(demoPackages);
}

// Usar datos demo si no hay conexión al backend
setTimeout(() => {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid.children.length) {
        console.log('Loading demo packages...');
        loadDemoPackages();
    }
}, 2000);
