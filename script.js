// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 9, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(5, 5, 9, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Parallax effects have been removed for better performance

// Scroll Animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .tech-category, .timeline-item, .team-member, .about-text, .about-visual, .contact-form, .contact-item');

    animatedElements.forEach(element => {
        // Add animation classes
        if (element.classList.contains('service-card') || element.classList.contains('team-member')) {
            element.classList.add('scale-in');
        } else if (element.classList.contains('timeline-item')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('tech-category')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('about-text')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('about-visual')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('contact-form')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('contact-item')) {
            element.classList.add('fade-in');
        }

        observer.observe(element);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.dataset.target);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target.toLocaleString();
                        if (entry.target.dataset.target === '99') {
                            entry.target.textContent = '99%';
                        }
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Form validation and submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 7l-5-5-5 5"/></svg>';

    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 2000);
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Typing effect for hero section
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-description');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #a855ff';

        let index = 0;
        function typeText() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 30);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }

        setTimeout(typeText, 2000); // Start after loading screen
    }
}

// Floating particles have been removed with parallax effects

// Add hover effects to cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .team-member, .tech-category');

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;

    cards.forEach(card => {
        if (!isMobile) {
            // Mouse effects for desktop only
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        } else {
            // Touch effects for mobile
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'perspective(1000px) scale(1.02)';
                card.style.transition = 'transform 0.2s ease';
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    card.style.transform = 'perspective(1000px) scale(1)';
                }, 150);
            }, { passive: true });
        }
    });
}

// Business Model Canvas Animation Setup
function setupBMCAnimations() {
    const bmcCards = document.querySelectorAll('.bmc-card');
    if (!bmcCards.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateBMCCard(entry.target);
            }
        });
    }, observerOptions);

    bmcCards.forEach(card => {
        observer.observe(card);
        setupBMCHoverEffects(card);
        setupBMCInteractions(card);
    });
}

function animateBMCCard(card) {
    card.classList.add('animate');

    const cardIndex = Array.from(document.querySelectorAll('.bmc-card')).indexOf(card);
    const delay = cardIndex * 100;

    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
    }, delay);
}

function setupBMCHoverEffects(card) {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        // Magnetic effect on mouse move (desktop only)
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        // Reset on mouse leave (desktop only)
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('animate')) {
                card.style.transform = 'translateY(0) scale(1)';
            } else {
                card.style.transform = 'translateY(50px)';
            }
        });
    }

    // Glow effect (works on both mobile and desktop)
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.bmc-icon');
        if (icon) {
            icon.style.boxShadow = '0 0 30px rgba(168, 85, 255, 0.6)';
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }

        const iconSvg = card.querySelector('.bmc-icon svg');
        if (iconSvg) {
            iconSvg.style.animation = 'pulse 1s ease-in-out infinite';
        }
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.bmc-icon');
        if (icon) {
            icon.style.boxShadow = '';
            icon.style.transform = '';
        }

        const iconSvg = card.querySelector('.bmc-icon svg');
        if (iconSvg) {
            iconSvg.style.animation = '';
        }
    });

    // Touch effects for mobile
    if (isMobile) {
        card.addEventListener('touchstart', (e) => {
            const icon = card.querySelector('.bmc-icon');
            if (icon) {
                icon.style.boxShadow = '0 0 25px rgba(168, 85, 255, 0.5)';
                icon.style.transform = 'scale(1.05) rotate(3deg)';
            }

            // Add subtle scale animation on touch
            card.style.transform = 'translateY(0) scale(1.02)';
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            const icon = card.querySelector('.bmc-icon');
            if (icon) {
                icon.style.boxShadow = '';
                icon.style.transform = '';
            }

            // Reset scale animation
            if (card.classList.contains('animate')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        }, { passive: true });
    }
}

function setupBMCInteractions(card) {
    // Click ripple effect
    card.addEventListener('click', (e) => {
        createBMCRipple(card, e);
    });

    // List item hover effects
    const listItems = card.querySelectorAll('.bmc-list li');
    listItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.color = '#4fd1ff';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.color = '';
        });
    });

    // Make cards focusable for keyboard navigation
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Business Model Canvas: ${card.querySelector('h3').textContent}`);
}

function createBMCRipple(card, event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';

    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    card.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    animateCounters();
    setupTypingEffect();
    setupCardHoverEffects();
    setupBMCAnimations();
});

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Parallax and scroll effects are already handled by requestAnimationFrame
        // in their respective event listeners
    });
});

// Add resize handler for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values
        window.dispatchEvent(new Event('scroll'));
    }, 250);
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-intensive functions
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based optimizations
}, 16)); // ~60fps

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});