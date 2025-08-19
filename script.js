// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update navigation links to use smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Modal Functions
function openLoginModal() {
    closeRegisterModal();
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegisterModal() {
    closeLoginModal();
    registerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulate login process
    if (username && password) {
        // Here you would normally send the data to your backend
        console.log('Login attempt:', { username, password });
        
        // For demo purposes, check for demo credentials
        if (username === 'demo' && password === 'demo123') { 
            alert('¡Bienvenido! Redirigiendo al portal de alumnos...'); 
            closeLoginModal(); 
            // Store user data in local storage 
            const userData = { 
                id: 1, 
                name: 'Demo User', 
                email: 'demo@idiomasavanza.mx'
            }; 
            localStorage.setItem('user_data', JSON.stringify(userData)); 
            // Redirect to student portal (to be implemented) 
            window.location.href = 'portal.html'; 
        } else {
            alert('Credenciales incorrectas. Intenta con usuario: "demo" y contraseña: "demo123"');
        }
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const userData = Object.fromEntries(formData);
    
    // Simulate registration process
    console.log('Registration attempt:', userData);
    
    // Basic validation
    if (userData.name && userData.email && userData.username && userData.password) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        closeRegisterModal();
        openLoginModal();
        registerForm.reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const contactData = Object.fromEntries(formData);
    
    console.log('Contact form submission:', contactData);
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    contactForm.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .cert-card, .feature-card, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--background-white)';
        header.style.backdropFilter = 'none';
    }
});

// Course card interactions (solo demo para botones sin enlace)
document.querySelectorAll('.course-card .btn').forEach(btn => {
    const isAnchor = btn.tagName === 'A';
    const hasHref = isAnchor && btn.getAttribute('href');
    if (!hasHref) {
        btn.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.course-card');
            const courseName = courseCard?.querySelector('h3')?.textContent || 'Curso';
            alert(`Más información sobre: ${courseName}\n\nEsta funcionalidad se implementará en la siguiente fase del desarrollo.`);
        });
    }
});

// Utility functions

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Idiomas Avanza - Escuela Digital de Idiomas');
    console.log('Frontend cargado correctamente');
    
    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.classList.add('fade-in-up');
        heroImage.classList.add('fade-in-up');
    }, 200);
});

// Export functions for global access
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
