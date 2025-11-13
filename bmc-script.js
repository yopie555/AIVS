// BMC Page Specific JavaScript

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
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
    // Magnetic effect on mouse move
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

    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('animate')) {
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.transform = 'translateY(50px)';
        }
    });

    // Glow effect on hover
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

        // Stagger animation for list items on card hover
        card.addEventListener('mouseenter', () => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
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

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const cards = Array.from(document.querySelectorAll('.bmc-card'));
        const currentIndex = cards.findIndex(card => card === document.activeElement);

        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        }

        cards[nextIndex].focus();
    }
});

// Performance optimization - Throttle scroll events
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

// Add loading animation for section
const bmcSection = document.querySelector('.bmc-section');
if (bmcSection) {
    bmcSection.style.opacity = '0';
    setTimeout(() => {
        bmcSection.style.transition = 'opacity 0.6s ease';
        bmcSection.style.opacity = '1';
    }, 200);
}

// PDF Export Functionality
function setupPDFExport() {
    const exportButton = document.getElementById('exportPDF');
    if (!exportButton) return;

    exportButton.addEventListener('click', () => {
        exportBMCToPDF();
    });
}

function exportBMCToPDF() {
    const exportButton = document.getElementById('exportPDF');

    // Add loading state
    exportButton.classList.add('loading');
    exportButton.innerHTML = `
        <span>Generating PDF...</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
    `;

    // Check if jsPDF is loaded
    if (!window.jspdf) {
        console.error('jsPDF library not loaded');
        showNotification('PDF library not available', 'error');
        resetExportButton(exportButton);
        return;
    }

    try {
        // Initialize jsPDF with portrait orientation
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // PDF Configuration
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;

        // Title Section with simple rect
        pdf.setFillColor(168, 85, 255);
        pdf.rect(0, 0, pageWidth, 35, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.text('Business Model Canvas', margin, 20);

        pdf.setFontSize(12);
        pdf.text('AI Video Storyteller - Strategic Framework', margin, 32);

        // BMC Data - Very Simplified for compatibility
        const bmcData = [
            { title: 'Key Partners', items: ['Platform AI (ChatGPT, Claude)', 'n8n automation', 'Media platforms', 'Digital sponsors'] },
            { title: 'Key Activities', items: ['Automated workflow', 'AI integration', 'Social media', 'Performance optimization'] },
            { title: 'Value Proposition', items: ['Zero-capital AI model', 'Automated production', 'Scalable across genres'] },
            { title: 'Customer Relationships', items: ['Audience engagement', 'Upload consistency', 'Creator collaboration'] },
            { title: 'Customer Segments', items: ['Young audiences (8-18)', 'Digital storytelling', 'Brand sponsors'] },
            { title: 'Key Resources', items: ['AI text models', 'Automation systems', 'Story templates', 'Creative team'] },
            { title: 'Channels', items: ['YouTube, TikTok', 'Instagram', 'Creative communities', 'Portfolio website'] },
            { title: 'Cost Structure', items: ['AI API costs', 'Hosting & automation', 'Content promotion'] },
            { title: 'Revenue Streams', items: ['YouTube AdSense', 'Brand placement', 'Script licensing', 'Merchandise'] }
        ];

        // Create portrait layout - 2 columns for better fit
        const cardWidth = (pageWidth - (margin * 2)) / 2 - 15;
        const cardHeight = 55;
        const cardSpacing = 10;
        const yPosition = 50;

        // Color mapping - use RGB values that work reliably
        const cardColors = [
            [168, 85, 255],   // Purple
            [56, 189, 248],    // Blue
            [251, 191, 36],   // Yellow
            [34, 197, 94],    // Green
            [239, 68, 68],    // Red
            [99, 102, 241],   // Indigo
            [236, 72, 153],   // Pink
            [245, 158, 11],   // Orange
            [16, 185, 129]    // Teal
        ];

        // Create cards in 2-column layout for portrait
        for (let i = 0; i < bmcData.length; i++) {
            const card = bmcData[i];
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = margin + (col * (cardWidth + cardSpacing));
            const y = yPosition + (row * (cardHeight + cardSpacing));

            // Card background with simple rect
            pdf.setFillColor(...cardColors[i]);
            pdf.rect(x, y, cardWidth, cardHeight, 'F');

            // Card border for better visibility
            pdf.setDrawColor(255, 255, 255);
            pdf.rect(x, y, cardWidth, cardHeight);

            // Card title
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text(card.title, x + 8, y + 15);

            // Card items
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');

            card.items.forEach((item, itemIndex) => {
                if (itemIndex < 3) { // Reduced to 3 items per card for portrait
                    const itemY = y + 25 + (itemIndex * 8);
                    const truncatedItem = item.length > 35 ? item.substring(0, 32) + '...' : item;
                    pdf.text(truncatedItem, x + 8, itemY);
                }
            });
        }

        // Add summary page
        pdf.addPage();

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Business Model Canvas Summary', margin, 30);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Company: AI Video Storyteller', margin, 50);
        pdf.text('Generated: ' + new Date().toLocaleDateString(), margin, 65);
        pdf.text('Framework: Strategic Business Model for AI Content Creation', margin, 80);

        // Add some spacing
        pdf.text('', margin, 95);
        pdf.text('This Business Model Canvas outlines the strategic approach', margin, 110);
        pdf.text('for AI Video Storyteller\'s automated content creation platform.', margin, 125);

        // Save the PDF with try-catch for file operations
        try {
            pdf.save('AI_Video_Storyteller_BMC.pdf');
            showNotification('PDF exported successfully!', 'success');
        } catch (saveError) {
            console.error('Error saving PDF:', saveError);
            showNotification('Error saving PDF file', 'error');
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
    } finally {
        // Always reset button state
        setTimeout(() => {
            resetExportButton(exportButton);
        }, 1000);
    }
}

function resetExportButton(exportButton) {
    exportButton.classList.remove('loading');
    exportButton.innerHTML = `
        <span>Export as PDF</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
    `;
}

// Show notification message
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupBMCAnimations();
    setupPDFExport();
});

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Any additional scroll-based optimizations
    });
});

// Add progress indicator for section visibility
const updateProgress = throttle(() => {
    const section = document.querySelector('.bmc-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = Math.max(0, rect.top);
    const sectionBottom = Math.min(windowHeight, rect.bottom);
    const visibleHeight = Math.max(0, sectionBottom - sectionTop);
    const progress = visibleHeight / rect.height;

    // Update any progress indicators if they exist
    const progressBars = document.querySelectorAll('.bmc-progress');
    progressBars.forEach(bar => {
        bar.style.width = `${progress * 100}%`;
    });
}, 16);

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);

// Easter egg: Konami code for BMC page
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

// Utility function to trigger animations manually
window.triggerBMCAnimations = function() {
    const cards = document.querySelectorAll('.bmc-card:not(.animate)');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, index * 100);
    });
};

// Reset animations function
window.resetBMCAnimations = function() {
    const cards = document.querySelectorAll('.bmc-card');
    cards.forEach(card => {
        card.classList.remove('animate');
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
    });
};