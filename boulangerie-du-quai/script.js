// --- Splash Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        splash.classList.add('fade-out');
        setTimeout(() => splash.style.display = 'none', 1500);
    }, 2700);
});

// --- Navigation mobile ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer menu au clic sur lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Fermer menu au clic extérieur
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Formulaire de devis simplifié
    const formDevis = document.getElementById('formDevis');
    if (formDevis) {
        formDevis.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre demande de devis ! Nous vous répondrons dans les plus brefs délais avec une proposition personnalisée.');
            formDevis.reset();
        });
    }
    
    // Parallax Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-bg img');
        if (heroImg) heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
    });
});

// Données des produits
const produitsData = {
    'pain-campagne': {
        title: 'Pain Campagne',
        price: '7,50 €',
        story: 'Notre pain signature, né d\'une fermentation lente de 72 heures au levain naturel. Une croûte croustillante et une mie alvéolée au caractère prononcé, comme autrefois.',
        pairing: 'Délicieux avec un fromage de brebis et un thé vert gunpowder.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80'
    },
    'pain-noix': {
        title: 'Pain aux Noix de Grenoble',
        price: '8,90 €',
        story: 'Une alliance parfaite entre la force d\'un levain naturel et la générosité des noix de Grenoble toastées. Chaque bouchée révèle des notes boisées et torréfiées.',
        pairing: 'Sublime avec un bleu d\'Auvergne et un vin moelleux.',
        image: 'https://images.unsplash.com/photo-1587652810475-8f4d4247c4c5?auto=format&fit=crop&w=1000&q=80'
    },
    'pizza': {
        title: 'Pizza Artisanale',
        price: '12,50 €',
        story: 'Pâte fermentée 48h, cuite au feu de bois. Garniture de saison et produits locaux sélectionnés avec amour.',
        pairing: 'À déguster avec une bière artisanale blonde et légère.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80'
    },
    'croissant': {
        title: 'Croissant au Beurre AOP',
        price: '2,80 €',
        story: 'Croissant feuilleté à la française, réalisé avec du beurre AOP Charentes-Poitou. 72 feuilles de beurre pour une légèreté incomparable.',
        pairing: 'Parfait avec un café noir corsé et une confiture maison.',
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=1000&q=80'
    },
    'cornes-gazelle': {
        title: 'Cornes de Gazelle',
        price: '3,80 €',
        story: 'Pâtisserie orientale raffinée en forme de croissant, fourrée d\'une pâte d\'amandes parfumée à l\'eau de fleur d\'oranger. Recette familiale transmise de mère en fille.',
        pairing: 'Idéal avec un thé à la menthe légèrement sucré.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80'
    },
    'eclair': {
        title: 'Éclair au Chocolat Noir 70%',
        price: '4,20 €',
        story: 'Éclair traditionnel avec crème pâtissière au chocolat noir de qualité supérieure et glaçage miroir. Un classique réinventé.',
        pairing: 'Accord parfait avec un expresso court et puissant.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=80'
    },
    'miel-thym': {
        title: 'Miel de Thym de Provence',
        price: '14,50 €',
        story: 'Miel monofloral rare, récolté en petite quantité dans les collines provençales au printemps. Notes herbacées persistantes et arômes intenses.',
        pairing: 'Exquis sur un fromage de chèvre frais ou dans un thé vert.',
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=80'
    },
    'ras-el-hanout': {
        title: 'Ras el Hanout Maison',
        price: '8,90 €',
        story: 'Notre mélange signature de 27 épices, torréfiées et moulues à la demande. Complexité aromatique exceptionnelle, secret de famille.',
        pairing: 'Parfait pour sublimer un tajine ou des légumes grillés.',
        image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=1000&q=80'
    },
    'confiture': {
        title: 'Confiture d\'Abricot du Roussillon',
        price: '6,50 €',
        story: 'Confiture artisanale à l\'ancienne, réalisée avec des abricots du Roussillon cueillis à maturité et sucre de canne. Cuisson lente au chaudron de cuivre.',
        pairing: 'Délicieuse sur une tartine beurrée ou avec un yaourt nature.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=80'
    }
};

// ===== FONCTIONS POUR LE PROGRAMME =====

function expandProgramme(element) {
    // Si on clique sur le bouton retour ou si c'est déjà étendu
    if (element.classList.contains('expanded')) {
        element.classList.remove('expanded');
        return;
    }

    // Fermer les autres
    document.querySelectorAll('.programme-pillar').forEach(p => p.classList.remove('expanded'));
    
    // Ouvrir l'actuel
    element.classList.add('expanded');
}

// Fermer au clic sur "Retour" spécifiquement
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche de redéclencher expandProgramme
        btn.parentElement.classList.remove('expanded');
    });
});

function openProduitModal(produitId) {
    const produit = produitsData[produitId];
    if (!produit) return;
    
    document.getElementById('modalTitle').textContent = produit.title;
    document.getElementById('modalPrice').textContent = produit.price;
    document.getElementById('modalStory').textContent = produit.story;
    document.getElementById('modalPairing').textContent = produit.pairing;
    document.getElementById('modalImage').src = produit.image;
    document.getElementById('modalImage').alt = produit.title;
    
    const modal = document.getElementById('produitModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProduitModal() {
    const modal = document.getElementById('produitModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== FONCTIONS POUR LA GALERIE =====

function openGalerieModal(imageUrl) {
    document.getElementById('galerieModalImage').src = imageUrl;
    document.getElementById('galerieModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalerieModal() {
    document.getElementById('galerieModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== FONCTIONS POUR LE MENU COMPLET =====

function openMenuModal() {
    document.getElementById('menuModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuModal() {
    document.getElementById('menuModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer modal en cliquant à l'extérieur
document.getElementById('produitModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProduitModal();
    }
});

document.getElementById('galerieModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGalerieModal();
    }
});

document.getElementById('menuModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMenuModal();
    }
});

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('produitModal').classList.contains('active')) {
            closeProduitModal();
        }
        if (document.getElementById('galerieModal').classList.contains('active')) {
            closeGalerieModal();
        }
        if (document.getElementById('menuModal').classList.contains('active')) {
            closeMenuModal();
        }
    }
});

// Navigation par ancres fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});