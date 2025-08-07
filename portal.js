// Portal JavaScript Functions

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to corresponding nav item
    const navLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (navLink) {
        navLink.closest('.nav-item').classList.add('active');
    }
}

// Logout function
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Clear any stored session data
        localStorage.removeItem('userSession');
        sessionStorage.clear();
        
        // Redirect to main page
        window.location.href = 'index.html';
    }
}

// Schedule filtering
function filterSchedule(type) {
    const cards = document.querySelectorAll('.schedule-card');
    const buttons = document.querySelectorAll('.schedule-filters .filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (type === 'all') {
            card.style.display = 'flex';
        } else {
            if (card.classList.contains(type)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Book filtering
function filterBooks(format) {
    const books = document.querySelectorAll('.book-card');
    const buttons = document.querySelectorAll('.biblioteca-filters .filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter books
    books.forEach(book => {
        if (format === 'all') {
            book.style.display = 'block';
        } else {
            if (book.dataset.format === format) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        }
    });
}

// Book search
function setupBookSearch() {
    const searchInput = document.getElementById('bookSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const books = document.querySelectorAll('.book-card');
            
            books.forEach(book => {
                const title = book.querySelector('.book-info h3').textContent.toLowerCase();
                const author = book.querySelector('.book-info p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    book.style.display = 'block';
                } else {
                    book.style.display = 'none';
                }
            });
        });
    }
}

// Book actions
function readOnline() {
    showNotification('Abriendo libro en el visor online...', 'info');
    // Here you would implement the online reader
    setTimeout(() => {
        alert(`Función de lectura online para ${bookId} se implementará en la siguiente fase.`);
    }, 1000);
}

function downloadBook(bookId) {
    showNotification('Iniciando descarga...', 'info');
    // Here you would implement the download functionality
    setTimeout(() => {
        showNotification('Descarga completada', 'success');
    }, 2000);
}

function playAudio(audioId) {
    showNotification('Iniciando reproducción de audio...', 'info');
    // Here you would implement the audio player
    setTimeout(() => {
        alert(`Reproductor de audio para ${audioId} se implementará en la siguiente fase.`);
    }, 1000);
}

// Payment functions
function makePayment() {
    showNotification('Redirigiendo a la pasarela de pago...', 'info');
    // Here you would integrate with Stripe/Clip
    setTimeout(() => {
        alert('La integración con Stripe/Clip se implementará en la siguiente fase.');
    }, 1000);
}

// Profile form handling
function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(profileForm);
            const profileData = Object.fromEntries(formData);
            
            console.log('Profile update:', profileData);
            showNotification('Perfil actualizado correctamente', 'success');
        });
    }
}

// Conversation room actions
function joinConversationRoom() {
    showNotification('Conectando a la sala de conversación...', 'info');
    // Here you would implement video conference integration
    setTimeout(() => {
        alert('La integración con plataforma de videoconferencia se implementará en la siguiente fase.');
    }, 1000);
}

// Notification system is now in utils.js

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Initialize portal
document.addEventListener('DOMContentLoaded', () => { 
    console.log('Portal de Alumnos - Idiomas Avanza');
    console.log('Portal cargado correctamente'); 
     
    // Load user data 
    const userData = getUserData(); 
    if (userData) { 
        const userNameSpan = document.querySelector('.user-name'); 
        if (userNameSpan) { 
            userNameSpan.textContent = `Bienvenido, ${userData.name}`; 
        } 
        const userInfoDiv = document.querySelector('.user-info'); 
        if (userInfoDiv) { 
            userInfoDiv.dataset.userId = userData.id; 
        } 
    } 

    // Setup search functionality 
    setupBookSearch();
    
    // Setup profile form
    setupProfileForm();
    
    // Add click handlers for conversation rooms
    document.querySelectorAll('.room-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const roomCard = e.target.closest('.room-card');
            const roomName = roomCard.querySelector('h3').textContent;
            joinConversationRoom(roomName);
        });
    });
    
    // Add click handlers for schedule actions
    document.querySelectorAll('.schedule-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const scheduleCard = e.target.closest('.schedule-card');
            const className = scheduleCard.querySelector('h3').textContent;
            
            if (btn.textContent.includes('Unirse')) {
                showNotification(`Conectando a ${className}...`, 'info');
            } else if (btn.textContent.includes('Reservar')) {
                showNotification(`Lugar reservado en ${className}`, 'success');
            }
        });
    });
    
    // Add mobile menu button if needed
    if (window.innerWidth <= 768) {
        const navLeft = document.querySelector('.nav-left');
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'btn btn-outline mobile-menu-btn';
        menuButton.style.marginRight = '1rem';
        menuButton.onclick = toggleSidebar;
        navLeft.insertBefore(menuButton, navLeft.firstChild);
    }
    
    // Auto-refresh dashboard data (simulation)
    setInterval(() => {
        // Here you would fetch real data from the backend
        console.log('Refreshing dashboard data...');
    }, 30000); // Every 30 seconds
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
    }
});

// Export functions for global access
window.showSection = showSection;
window.logout = logout;
window.filterSchedule = filterSchedule;
window.filterBooks = filterBooks;
window.readOnline = readOnline;
window.downloadBook = downloadBook;
window.playAudio = playAudio;
window.makePayment = makePayment;

