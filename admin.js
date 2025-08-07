// Admin Panel JavaScript
const API_CONFIG = {
    baseUrl: '/backend/api/admin',
    endpoints: {
        stats: '/stats',
        recentActivity: '/recent-activity',
        users: '/users',
        books: '/books',
        libraryStats: '/library-stats',
        addBook: '/add-book'
    }
};

let currentSection = 'dashboard';
let currentPage = 1;
let currentFilters = {};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin panel loaded');
    checkAuthentication();
    loadDashboardData();
});

// Verificar autenticación
function checkAuthentication() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Verificar que el usuario sea administrador
    // En una implementación real, verificarías el rol del token
    console.log('User authenticated as admin');
}

// Mostrar sección


// Cargar datos del dashboard
async function loadDashboardData() {
    try {
        showLoading(true);
        
        const response = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.stats, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateDashboardStats(data);
            loadRecentActivity();
        } else {
            console.error('Error loading dashboard data');
            loadDemoStats();
        }
    } catch (error) {
        console.error('Error:', error);
        loadDemoStats();
    } finally {
        showLoading(false);
    }
}

// Actualizar estadísticas del dashboard
function updateDashboardStats(data) {
    document.getElementById('totalUsers').textContent = data.total_users || 0;
    document.getElementById('totalBooks').textContent = data.total_books || 0;
    document.getElementById('totalRevenue').textContent = '$' + (data.total_revenue || 0).toLocaleString();
    document.getElementById('activeUsers').textContent = data.active_users || 0;
    
    // Crear gráfico de distribución por idioma
    if (data.language_distribution) {
        createLanguageChart(data.language_distribution);
    }
}

// Crear gráfico de idiomas
function createLanguageChart(data) {
    const ctx = document.getElementById('languageChart');
    if (!ctx) return;
    
    const labels = data.map(item => item.idioma);
    const values = data.map(item => item.total);
    const colors = ['#2563eb', '#dc2626', '#059669', '#d97706', '#7c3aed'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Cargar actividad reciente
async function loadRecentActivity() {
    try {
        const response = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.recentActivity, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayRecentActivity(data.activities);
        } else {
            loadDemoActivity();
        }
    } catch (error) {
        console.error('Error loading recent activity:', error);
        loadDemoActivity();
    }
}

// Mostrar actividad reciente
function displayRecentActivity(activities) {
    const container = document.getElementById('recentActivity');
    container.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icono}"></i>
            </div>
            <div class="activity-content">
                <h4 class="activity-title">${activity.titulo}</h4>
                <p class="activity-description">${activity.descripcion}</p>
            </div>
            <div class="activity-time">
                ${formatDate(activity.fecha)}
            </div>
        `;
        
        container.appendChild(activityItem);
    });
}

// Cargar usuarios
async function loadUsers(page = 1) {
    try {
        showLoading(true);
        
        const params = new URLSearchParams({
            page: page,
            limit: 20,
            search: document.getElementById('userSearch')?.value || '',
            role: document.getElementById('roleFilter')?.value || ''
        });
        
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.users}?${params}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayUsers(data.users);
            updatePagination('usersPagination', data.page, data.total_pages, loadUsers);
        } else {
            console.error('Error loading users');
            loadDemoUsers();
        }
    } catch (error) {
        console.error('Error:', error);
        loadDemoUsers();
    } finally {
        showLoading(false);
    }
}

// Mostrar usuarios
function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nombre} ${user.apellido}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.rol}">${user.rol}</span></td>
            <td>${user.nivel_idioma || '-'}</td>
            <td>${formatDate(user.fecha_registro)}</td>
            <td><span class="status-badge ${user.activo ? 'active' : 'inactive'}">${user.activo ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Cargar biblioteca
async function loadLibrary(page = 1) {
    try {
        showLoading(true);
        
        const params = new URLSearchParams({
            page: page,
            limit: 20,
            search: document.getElementById('bookSearch')?.value || '',
            language: document.getElementById('languageFilter')?.value || '',
            format: document.getElementById('formatFilter')?.value || '',
            category: document.getElementById('categoryFilter')?.value || ''
        });
        
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.books}?${params}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayBooks(data.books);
            updatePagination('booksPagination', data.page, data.total_pages, loadLibrary);
            loadLibraryStats();
        } else {
            console.error('Error loading library');
            loadDemoBooks();
        }
    } catch (error) {
        console.error('Error:', error);
        loadDemoBooks();
    } finally {
        showLoading(false);
    }
}

// Mostrar libros
function displayBooks(books) {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.titulo}</td>
            <td>${book.autor}</td>
            <td>${book.idioma}</td>
            <td>${book.nivel}</td>
            <td><span class="status-badge ${book.formato.toLowerCase()}">${book.formato}</span></td>
            <td>${book.categoria}</td>
            <td><span class="status-badge ${book.activo ? 'active' : 'inactive'}">${book.activo ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewBook(${book.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editBook(${book.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteBook(${book.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Cargar estadísticas de biblioteca
async function loadLibraryStats() {
    try {
        const response = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.libraryStats, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateLibraryStats(data);
        }
    } catch (error) {
        console.error('Error loading library stats:', error);
    }
}

// Actualizar estadísticas de biblioteca
function updateLibraryStats(data) {
    document.getElementById('libraryTotalBooks').textContent = data.total_books || 0;
    
    if (data.by_language) {
        const languageText = Object.entries(data.by_language)
            .map(([lang, count]) => `${lang}: ${count}`)
            .join(', ');
        document.getElementById('libraryByLanguage').textContent = languageText;
    }
    
    if (data.by_format) {
        const formatText = Object.entries(data.by_format)
            .map(([format, count]) => `${format}: ${count}`)
            .join(', ');
        document.getElementById('libraryByFormat').textContent = formatText;
    }
}

// Filtros
function filterUsers() {
    loadUsers(1);
}

function filterBooks() {
    loadLibrary(1);
}

// Modales
function showAddBookModal() {
    document.getElementById('addBookModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Agregar libro
async function addBook() {
    const formData = {
        titulo: document.getElementById('bookTitle').value,
        autor: document.getElementById('bookAuthor').value,
        idioma: document.getElementById('bookLanguage').value,
        nivel: document.getElementById('bookLevel').value,
        formato: document.getElementById('bookFormat').value,
        categoria: document.getElementById('bookCategory').value,
        descripcion: document.getElementById('bookDescription').value
    };
    
    // Validar campos requeridos
    if (!formData.titulo || !formData.autor || !formData.idioma || 
        !formData.nivel || !formData.formato || !formData.categoria) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    try {
        showLoading(true);
        
        const response = await fetch('/backend/api/admin/add-book', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Libro agregado exitosamente');
            closeModal('addBookModal');
            loadLibrary();
            
            // Limpiar formulario
            document.getElementById('addBookForm').reset();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
    } finally {
        showLoading(false);
    }
}

// Acciones de usuario
function viewUser(userId) {
    console.log('View user:', userId);
    // Implementar vista de usuario
}

function editUser(userId) {
    console.log('Edit user:', userId);
    // Implementar edición de usuario
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        console.log('Delete user:', userId);
        // Implementar eliminación de usuario
    }
}

// Acciones de libro
function viewBook(bookId) {
    console.log('View book:', bookId);
    // Implementar vista de libro
}

function editBook(bookId) {
    console.log('Edit book:', bookId);
    // Implementar edición de libro
}

function deleteBook(bookId) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        console.log('Delete book:', bookId);
        // Implementar eliminación de libro
    }
}

// Paginación
function updatePagination(containerId, currentPage, totalPages, loadFunction) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '‹ Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => loadFunction(currentPage - 1);
    container.appendChild(prevBtn);
    
    // Números de página
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => loadFunction(i);
        container.appendChild(pageBtn);
    }
    
    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Siguiente ›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => loadFunction(currentPage + 1);
    container.appendChild(nextBtn);
}

// Utilidades
function getAuthToken() {
    return localStorage.getItem('auth_token') || 'demo_admin_token';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}



// Datos demo para desarrollo
function loadDemoStats() {
    updateDashboardStats({
        total_users: 1247,
        total_books: 1000,
        total_revenue: 125000,
        active_users: 89,
        language_distribution: [
            { idioma: 'inglés', total: 450 },
            { idioma: 'francés', total: 300 },
            { idioma: 'portugués', total: 250 }
        ]
    });
}

function loadDemoActivity() {
    const demoActivities = [
        {
            tipo: 'usuario',
            titulo: 'Nuevo usuario registrado',
            descripcion: 'María González (maria@email.com)',
            fecha: new Date().toISOString(),
            icono: 'fas fa-user-plus'
        },
        {
            tipo: 'libro',
            titulo: 'Nuevo libro agregado',
            descripcion: 'Gramática Inglesa Avanzada - John Smith',
            fecha: new Date(Date.now() - 3600000).toISOString(),
            icono: 'fas fa-book'
        },
        {
            tipo: 'pago',
            titulo: 'Pago procesado',
            descripcion: 'Carlos Ruiz - $2,500 MXN',
            fecha: new Date(Date.now() - 7200000).toISOString(),
            icono: 'fas fa-credit-card'
        }
    ];
    
    displayRecentActivity(demoActivities);
}

function loadDemoUsers() {
    const demoUsers = [
        {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            email: 'juan@email.com',
            rol: 'alumno',
            nivel_idioma: 'B1',
            fecha_registro: '2024-01-15',
            activo: true
        },
        {
            id: 2,
            nombre: 'María',
            apellido: 'González',
            email: 'maria@email.com',
            rol: 'profesor',
            nivel_idioma: 'C2',
            fecha_registro: '2024-01-10',
            activo: true
        }
    ];
    
    displayUsers(demoUsers);
}

function loadDemoBooks() {
    const demoBooks = [
        {
            id: 1,
            titulo: 'Gramática Inglesa Básica',
            autor: 'John Smith',
            idioma: 'inglés',
            nivel: 'A1',
            formato: 'PDF',
            categoria: 'Gramática',
            activo: true
        },
        {
            id: 2,
            titulo: 'Conversación Francesa',
            autor: 'Marie Dubois',
            idioma: 'francés',
            nivel: 'B1',
            formato: 'Audio',
            categoria: 'Conversación',
            activo: true
        }
    ];
    
    displayBooks(demoBooks);
}

// Funciones placeholder para otras secciones






