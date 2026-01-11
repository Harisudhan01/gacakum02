// ==========================================
// ADVANCED ANIMATIONS AND INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all animation effects
    initNavbarAnimations();
    initScrollAnimations();
    initInteractiveElements();
    initPageLoadAnimations();
});


function initNavbarAnimations() {
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');

    // Add staggered animation to nav items
    navItems.forEach((item, index) => {
        item.style.animation = `slideInDown 0.6s ease-out ${index * 0.1}s forwards`;
        item.style.opacity = '0';
    });

    // Smooth scroll on nav link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    smoothScroll(target, 100);
                    // Add active state
                    navLinks.forEach(l => l.parentElement.classList.remove('active'));
                    this.parentElement.classList.add('active');
                }
            }
        });

        // Highlight active nav item on scroll
        link.addEventListener('mouseenter', function () {
            navLinks.forEach(l => l.style.color = '#ffffff');
            this.style.color = '#ffffff';
        });

        link.addEventListener('mouseleave', function () {
            this.style.color = '#ffffff';
        });
    });

    // Navbar background effect on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.boxShadow = '0 12px 40px rgba(0, 26, 77, 0.4)';
        } else {
            // Scrolling up
            navbar.style.boxShadow = '0 8px 32px rgba(0, 26, 77, 0.3)';
        }

        // STICKY NAVBAR LOGIC
        if (scrollTop > 0) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                // Optionally stop observing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe hero section
    const heroSection = document.querySelector('.college-header-image');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// ==========================================
// INTERACTIVE ELEMENTS
// ==========================================

function initInteractiveElements() {
    // Add ripple effect to nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            createRipple(e, this);
        });
    });

    // Add hover lift effect to content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 16px 50px rgba(0, 26, 77, 0.2)';
        });

        section.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 20px rgba(0, 26, 77, 0.1)';
        });
    });

    // Parallax effect on hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollY = window.pageYOffset;
            heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        });
    }
}

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================

function initPageLoadAnimations() {
    // Animate the notifications bar
    const notificationBar = document.querySelector('.notifications-bar');
    if (notificationBar) {
        notificationBar.style.animation = 'slideInUp 0.8s ease-out 0.3s forwards';
    }

    // Stagger animation for college info
    const collegeInfo = document.querySelectorAll('.college-info p');
    collegeInfo.forEach((p, index) => {
        p.style.animation = `fadeInUp 1s ease-out ${0.4 + index * 0.15}s forwards`;
        p.style.opacity = '0';
    });

    // Page title animation
    const pageTitle = document.querySelector('.tamil-title');
    if (pageTitle) {
        pageTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Smooth scroll to element with offset
 */
function smoothScroll(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Create ripple effect on click
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles dynamically if not in CSS
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .nav-item {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

/**
 * Handle active navigation based on scroll position
 */
function handleActiveNavOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.parentElement.classList.add('active');
            }
        });
    });
}

// Initialize active nav on scroll
handleActiveNavOnScroll();

/**
 * Animate elements on page load
 */
function animateOnLoad() {
    // Add fade-in animation to all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
        el.style.opacity = '0';
    });
}

animateOnLoad();

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Log that script is loaded
console.log('✓ Advanced animations initialized successfully');

// ==========================================
// IMAGE SLIDER FUNCTIONALITY
// ==========================================

let currentSlideIndex = 0;
let autoSlideTimer;
const slidesToShow = document.querySelectorAll('.slider-item');
const totalSlides = slidesToShow.length;

// Slide content data
const slideContent = [
    {
        title: 'Campus Facilities',
        description: 'Our college boasts state-of-the-art facilities and beautiful campus infrastructure designed to provide an excellent learning environment for our students.',
        features: ['Modern Campus Buildings', 'Well-Equipped Laboratories', 'Advanced Technology', 'Green Campus']
    },
    {
        title: 'New Bridge Opening',
        description: 'The newly inaugurated bridge marks a significant milestone in our campus development. This modern infrastructure enhances connectivity and reflects our commitment to continuous improvement.',
        features: ['Modern Architecture', 'Enhanced Connectivity', 'Safety Standards', 'Sustainable Design']
    }
];

/**
 * Initialize auto slider on page load
 */
function initAutoSlider() {
    if (totalSlides > 0) {
        autoSlide();
    }
}

/**
 * Auto-advance slider every 5 seconds
 */
function autoSlide() {
    clearTimeout(autoSlideTimer);
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
    autoSlideTimer = setTimeout(autoSlide, 5000); // Change slide every 5 seconds
}

/**
 * Show specific slide by index
 */
function showSlide(index) {
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    // Update slide visibility
    slidesToShow.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) {
            slide.classList.add('active');
        }
    });

    // Update description content
    updateSlideDescription(currentSlideIndex);

    // Update indicator
    updateIndicators();
}

/**
 * Update slide description content
 */
function updateSlideDescription(slideIndex) {
    const content = slideContent[slideIndex];

    // Update title
    const titleElement = document.getElementById('slide-title');
    if (titleElement) {
        titleElement.textContent = content.title;
        titleElement.style.animation = 'none';
        setTimeout(() => {
            titleElement.style.animation = 'fadeInUp 0.6s ease-out';
        }, 10);
    }

    // Update description
    const descElement = document.getElementById('slide-description');
    if (descElement) {
        descElement.textContent = content.description;
        descElement.style.animation = 'none';
        setTimeout(() => {
            descElement.style.animation = 'fadeInUp 0.6s ease-out 0.1s forwards';
        }, 10);
    }

    // Update features list
    const featuresList = document.getElementById('slide-features');
    if (featuresList) {
        featuresList.innerHTML = '';
        content.features.forEach((feature, index) => {
            const li = document.createElement('li');
            li.textContent = feature;
            li.style.animation = 'none';
            featuresList.appendChild(li);

            // Trigger animation
            setTimeout(() => {
                li.style.animation = `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s forwards`;
            }, 10);
        });
    }
}

/**
 * Navigate to next slide
 */
function nextSlide() {
    showSlide(currentSlideIndex + 1);
    autoSlide(); // Reset auto-slide timer
}

/**
 * Navigate to previous slide
 */
function prevSlide() {
    showSlide(currentSlideIndex - 1);
    autoSlide(); // Reset auto-slide timer
}

/**
 * Jump to specific slide
 */
function currentSlide(index) {
    showSlide(index);
    autoSlide(); // Reset auto-slide timer
}

/**
 * Update indicator dots
 */
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        }
    });
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all animation effects (existing code)
    initNavbarAnimations();
    initScrollAnimations();
    initInteractiveElements();
    initPageLoadAnimations();

    // Initialize auto slider
    initAutoSlider();
});
// Select only sections AFTER hero & navbar
const sections = document.querySelectorAll(
    "section:not(.hero-section)"
);

// Add animation class
sections.forEach(section => {
    section.classList.add("scroll-animate");
});

// Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

// Observe sections
sections.forEach(section => observer.observe(section));
const counters = document.querySelectorAll(".stat-number");
let counterStarted = false;

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    let count = 0;
                    const speed = target / 120;

                    const updateCount = () => {
                        if (count < target) {
                            count += speed;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    },
    { threshold: 0.4 }
);

counterObserver.observe(document.querySelector(".glimpse-milestone-section"));
var contact = document.getElementById("contactBtn");
var popup = document.getElementById("popup");
var close1 = document.getElementById("close1");
contact.addEventListener("click", () => {
    popup.style.display = "flex";
})
close1.addEventListener("click", () => {
    popup.style.display = "none";
})

