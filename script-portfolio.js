// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and timeline items
document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

document.querySelectorAll('.timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        const isValid = Array.from(inputs).every(input => input.value.trim() !== '');
        
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
        }
    });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.borderBottomColor = 'rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.borderBottomColor = 'rgba(212, 175, 55, 0.1)';
    }
});

// Add subtle parallax effect to hero section
const heroSection = document.querySelector('.hero');
const gradientSpheres = document.querySelectorAll('.gradient-sphere');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY < window.innerHeight) {
        gradientSpheres.forEach((sphere, index) => {
            const speed = (index + 1) * 0.5;
            sphere.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
});

// Stagger animation for stats
const stats = document.querySelectorAll('.stat');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => {
    stat.style.opacity = '0';
    statsObserver.observe(stat);
});

// Add keyboard navigation
let currentNavIndex = -1;
const navItems = document.querySelectorAll('.nav-link');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        currentNavIndex = (currentNavIndex + 1) % navItems.length;
        navItems[currentNavIndex].focus();
    } else if (e.key === 'ArrowLeft') {
        currentNavIndex = (currentNavIndex - 1 + navItems.length) % navItems.length;
        navItems[currentNavIndex].focus();
    }
});

// Add animation styles to document
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-menu.active {
        display: flex !important;
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(15, 23, 42, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(212, 175, 55, 0.1);
            padding: 2rem 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu a {
            display: block;
            padding: 1rem;
            margin: 0.5rem 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Lazy load images if any
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

console.log('Portfolio loaded successfully!');
