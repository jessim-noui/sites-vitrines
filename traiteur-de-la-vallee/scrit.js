// --- Intro Splash Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        splash.classList.add('fade-out');
        document.querySelector('.hero').classList.add('active');
        setTimeout(() => splash.style.display = 'none', 1000);
    }, 1200);
});

// --- Navigation Scroll Effect ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// --- Mobile Navigation Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// --- Reveal Animation on Scroll ---
const observerOptions = { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- LOGIQUE ACCORDÉON (CUISINE) ---
function expandSeason(element) {
    // Close all other pillars on mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.season-pillar').forEach(p => {
            if (p !== element) {
                p.classList.remove('expanded');
            }
        });
    }
    
    if (element.classList.contains('expanded')) return;
    element.classList.add('expanded');
}

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const pillar = btn.closest('.season-pillar');
        if (pillar) pillar.classList.remove('expanded');
    });
});

// Close expanded pillar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
        const expandedPillar = document.querySelector('.season-pillar.expanded');
        const isClickInsidePillar = expandedPillar && expandedPillar.contains(e.target);
        const isClickOnBackBtn = e.target.closest('.back-btn');
        
        if (expandedPillar && !isClickInsidePillar && !isClickOnBackBtn) {
            expandedPillar.classList.remove('expanded');
        }
    }
});

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const creationCards = document.querySelectorAll('.creation-card');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImageIndex = 0;
let imagesList = [];

// Construire la liste des images
creationCards.forEach((card, index) => {
    const imgUrl = card.getAttribute('data-image');
    if(imgUrl) imagesList.push(imgUrl);
    
    card.addEventListener('click', () => {
        if(imgUrl) {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
    });
});

function updateLightboxImage() {
    if (imagesList[currentImageIndex]) {
        lightboxImg.src = imagesList[currentImageIndex];
        lightboxImg.alt = `Image ${currentImageIndex + 1} de ${imagesList.length}`;
    }
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    updateLightboxImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + imagesList.length) % imagesList.length;
    updateLightboxImage();
});

closeBtn.addEventListener('click', () => {
    closeLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    }
});

// --- Formulaire Devis ---
const devisForm = document.getElementById('devis-form');
if (devisForm) {
    devisForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#e0e0e0';
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Merci ! Votre demande de devis a été envoyée avec succès.');
            this.reset();
        } else {
            alert('Veuillez remplir tous les champs obligatoires (*).');
        }
    });
}

// --- Responsive adjustments on window resize ---
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            navLinks.classList.remove('active');
            if (navToggle) navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Close all expanded pillars on mobile when switching to desktop
        if (window.innerWidth >= 768) {
            document.querySelectorAll('.season-pillar.expanded').forEach(pillar => {
                pillar.classList.remove('expanded');
            });
        }
    }, 250);
});

// --- Prevent horizontal scroll on mobile ---
window.addEventListener('scroll', () => {
    if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
    }
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});