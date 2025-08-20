// Modern Dark Theme Portfolio - Advanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimized - Cache DOM elements
    const elements = {
        preloader: document.querySelector('.preloader'),
        navbar: document.querySelector('.navbar'),
        menuToggle: document.querySelector('.menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        navItems: document.querySelectorAll('.nav-item'),
        sections: document.querySelectorAll('section'),
        contactForm: document.querySelector('.contact-form'),
        skillBars: document.querySelectorAll('.skill-progress'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),
        testimonialCards: document.querySelectorAll('.testimonial-card'),
        testimonialDots: document.querySelectorAll('.dot'),
        testimonialPrev: document.querySelector('.testimonial-prev'),
        testimonialNext: document.querySelector('.testimonial-next'),
    };

    // ============================================================================
    // 1. PRELOADER WITH ENHANCED ANIMATION
    // ============================================================================
    function hidePreloader() {
        const loader = elements.preloader;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            setTimeout(() => {
                loader.remove();
                document.body.style.overflow = 'visible';
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }
    }

    // Hide preloader when page is fully loaded
    if (document.readyState === 'loading') {
        window.addEventListener('load', hidePreloader);
    } else {
        hidePreloader();
    }

    // ============================================================================
    // 2. NAVBAR FUNCTIONALITY
    // ============================================================================
    let lastScrollTop = 0;
    
    function handleNavbarScroll() {
        const navbar = elements.navbar;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation link
        updateActiveNavLink();
    }

    // Mobile menu toggle with animation
    function setupMobileMenu() {
        const { menuToggle, navLinks } = elements;
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking nav links
            elements.navItems.forEach(item => {
                item.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const { sections, navItems } = elements;
        const scrollPos = window.pageYOffset + 200;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const activeNavItem = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }

    // ============================================================================
    // 3. SMOOTH SCROLLING & SCROLL ANIMATIONS
    // ============================================================================
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Advanced Intersection Observer for animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('skill-item')) {
                        animateSkillBar(entry.target);
                    }
                    
                    // Don't observe again for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .skill-item, .timeline-item, .project-card, .education-card, .cert-card, .leadership-card, .hackathon-card, .design-card, .blog-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ============================================================================
    // 4. SKILLS SECTION - ANIMATED PROGRESS BARS
    // ============================================================================
    function animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const targetWidth = progressBar.getAttribute('data-width');
        
        if (progressBar && targetWidth) {
            setTimeout(() => {
                progressBar.style.width = targetWidth + '%';
                
                // Add counting animation for percentage
                const percentSpan = skillItem.querySelector('.skill-percent');
                if (percentSpan) {
                    animateValue(percentSpan, 0, parseInt(targetWidth), 2000);
                }
            }, 200);
        }
    }

    // Animate number counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ============================================================================
    // 5. PROJECTS SECTION - FILTERING SYSTEM
    // ============================================================================
    function setupProjectFiltering() {
        const { filterBtns, projectCards } = elements;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('hidden');
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================================================
    // 6. TESTIMONIALS CAROUSEL
    // ============================================================================
    function setupTestimonialsCarousel() {
        const { testimonialCards, testimonialDots, testimonialPrev, testimonialNext } = elements;
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            
            if (testimonialDots.length > 0) {
                testimonialDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }

        // Auto-advance testimonials
        function autoAdvance() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }

        // Set up auto-advance
        let testimonialInterval = setInterval(autoAdvance, 5000);

        // Navigation buttons
        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(currentTestimonial);
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(autoAdvance, 5000);
            });
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
                showTestimonial(currentTestimonial);
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(autoAdvance, 5000);
            });
        }

        // Dots navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(autoAdvance, 5000);
            });
        });
    }

    // ============================================================================
    // 7. CONTACT FORM WITH VALIDATION
    // ============================================================================
    function setupContactForm() {
        const form = elements.contactForm;
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                field.classList.remove('error');
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Submit animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // ============================================================================
    // 8. NOTIFICATION SYSTEM
    // ============================================================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-primary)' : type === 'error' ? '#ef4444' : 'var(--bg-tertiary)'};
            color: var(--text-primary);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: 10px;
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform var(--transition-smooth);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ============================================================================
    // 9. ENHANCED VISUAL EFFECTS
    // ============================================================================
    function triggerEntranceAnimations() {
        // Hero animations
        const heroElements = document.querySelectorAll('.greeting, .name, .profession, .hero-description, .hero-buttons, .hero-stats, .image-container');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `slideUpFade 1s ease-out forwards`;
            }, index * 200);
        });
    }

    // Parallax effect for hero background
    function setupParallaxEffect() {
        const heroBackground = document.querySelector('.hero-bg');
        if (!heroBackground) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }, { passive: true });
    }

    // Cursor glow effect
    function setupCursorEffects() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-primary), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '0.6';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }

    // ============================================================================
    // 10. PERFORMANCE OPTIMIZATION
    // ============================================================================
    // Throttled scroll handler
    let scrollTimeout;
    function throttledScroll() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            handleNavbarScroll();
            scrollTimeout = null;
        }, 16); // ~60fps
    }

    // ============================================================================
    // 11. INITIALIZATION
    // ============================================================================
    function initializePortfolio() {
        setupMobileMenu();
        setupDropdownNavigation();
        setupSmoothScrolling();
        setupScrollAnimations();
        setupProjectFiltering();
        setupTestimonialsCarousel();
        setupContactForm();
        setupParallaxEffect();
        setupCursorEffects();
        
        // Event listeners
        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', handleDropdownResize, { passive: true });
        
        // Resize handler for responsive adjustments
        window.addEventListener('resize', () => {
            // Refresh mobile menu state
            if (window.innerWidth > 768) {
                elements.navLinks?.classList.remove('active');
                elements.menuToggle?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Handle dropdown behavior
            handleDropdownResize();
        });

        console.log('🚀 Modern Portfolio JavaScript Initialized!');
    }

    // Start the show!
    initializePortfolio();

    // ============================================================================
    // 12. CLEANUP AND OPTIMIZATION
    // ============================================================================
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        // Clear any intervals or timeouts
        clearTimeout(scrollTimeout);
    });
});

// Add CSS for notifications and cursor effects
const style = document.createElement('style');
style.textContent = `
    .notification {
        font-family: var(--font-primary);
        font-size: var(--font-size-sm);
        font-weight: 500;
    }
    
    .notification i {
        font-size: var(--font-size-base);
    }
    
    .cursor-glow {
        mix-blend-mode: screen;
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// Setup dropdown navigation
function setupDropdownNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Handle mobile dropdown clicks
            if (window.innerWidth <= 768) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            }
            
            // Handle dropdown item clicks
            const dropdownItems = menu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Close mobile menu
                    if (elements.menuToggle && elements.navLinks) {
                        elements.menuToggle.classList.remove('active');
                        elements.navLinks.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    // Close dropdown
                    dropdown.classList.remove('active');
                });
            });
        }
    });
}

// Handle window resize for dropdown behavior
function handleDropdownResize() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}
