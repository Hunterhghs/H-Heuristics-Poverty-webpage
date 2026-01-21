// ============================================
// H HEURISTICS - POVERTY INSIGHTS
// Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initNavHighlight();
    initCounterAnimations();
    initSmoothScroll();
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .section-header,
        .overview-main,
        .sidebar-card,
        .timeline-item,
        .trend-card,
        .africa-stat-card,
        .country-card,
        .dimension-card,
        .driver-card,
        .scenario-card,
        .priority-item,
        .conclusion-point,
        .callout
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index % 4 * 0.1}s, transform 0.6s ease ${index % 4 * 0.1}s`;
        observer.observe(el);
    });
}

// Add CSS class for animated elements
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// NAVIGATION HIGHLIGHT
// ============================================

function initNavHighlight() {
    const nav = document.querySelector('.nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Update nav background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(26, 35, 50, 0.98)';
        } else {
            nav.style.background = 'rgba(26, 35, 50, 0.95)';
        }
    });

    // Highlight current section in nav
    const highlightNav = () => {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Add active style
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--accent-gold);
        }
    `;
    document.head.appendChild(activeStyle);
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .africa-stat-number, .timeline-stat');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasM = text.includes('M');
    const hasB = text.includes('B');
    const hasPercent = text.includes('%');
    const hasPts = text.includes('pts');
    
    // Extract numeric value
    let numStr = text.replace(/[^0-9.]/g, '');
    const targetNum = parseFloat(numStr);
    
    if (isNaN(targetNum)) return;
    
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const currentNum = targetNum * easeProgress;
        
        let displayNum;
        if (targetNum >= 100) {
            displayNum = Math.round(currentNum);
        } else if (targetNum >= 10) {
            displayNum = currentNum.toFixed(1);
        } else {
            displayNum = currentNum.toFixed(2);
        }
        
        let suffix = '';
        let prefix = '';
        
        if (hasM) suffix = 'M';
        if (hasB) suffix = 'B';
        if (hasPercent) suffix = '%';
        if (hasPts) suffix = ' pts';
        if (text.includes('+')) prefix = '+';
        if (text.includes('-') && !hasPts) prefix = '-';
        if (text.includes('~')) prefix = '~';
        
        element.textContent = prefix + displayNum + suffix;
        
        if (currentStep >= steps) {
            clearInterval(timer);
            element.textContent = originalText;
        }
    }, stepTime);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERACTIVE DATA TABLE
// ============================================

// Add hover effects to data table rows
document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
        this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrollPos = window.scrollY;
    
    if (scrollPos < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollPos * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrollPos / window.innerHeight * 0.5);
    }
});

// ============================================
// RESPONSIVE NAVIGATION (Mobile Menu)
// ============================================

// Create mobile menu button
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelector('.nav-links');

const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;
mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');

// Only add on mobile
if (window.innerWidth <= 768) {
    navContainer.appendChild(mobileMenuBtn);
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
    }
    
    .mobile-menu-btn span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--slate-300);
        transition: all 0.3s ease;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: flex;
        }
        
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 35, 50, 0.98);
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
        
        .nav-links a {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
    }
`;
document.head.appendChild(mobileStyles);

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

console.log('H Heuristics Poverty Insights - Loaded');
