// Modern Dark Theme Portfolio - Advanced JavaScript
(function() {
    'use strict';

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

    // Navigation dropdown functionality
    function setupDropdowns() {
        const portfolioNavItem = document.querySelector('.nav-item:nth-child(2)'); // Portfolio item
        const servicesNavItem = document.querySelector('.nav-item:nth-child(3)'); // Services item
        const portfolioDropdown = document.querySelector('.nav-dropdown');
        const servicesDropdown = document.querySelector('.services-dropdown');

        // Portfolio dropdown
        if (portfolioNavItem && portfolioDropdown) {
            portfolioNavItem.addEventListener('mouseenter', () => {
                portfolioDropdown.classList.add('active');
            });

            portfolioNavItem.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!portfolioDropdown.matches(':hover')) {
                        portfolioDropdown.classList.remove('active');
                    }
                }, 100);
            });

            portfolioDropdown.addEventListener('mouseleave', () => {
                portfolioDropdown.classList.remove('active');
            });
        }

        // Services dropdown
        if (servicesNavItem && servicesDropdown) {
            servicesNavItem.addEventListener('mouseenter', () => {
                servicesDropdown.classList.add('active');
            });

            servicesNavItem.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!servicesDropdown.matches(':hover')) {
                        servicesDropdown.classList.remove('active');
                    }
                }, 100);
            });

            servicesDropdown.addEventListener('mouseleave', () => {
                servicesDropdown.classList.remove('active');
            });
        }

        // Close dropdowns when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Testimonials carousel functionality
    function setupTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            // Hide all testimonials
            testimonialCards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentTestimonial = index;
        }

        // Initialize first testimonial
        if (testimonialCards.length > 0) {
            showTestimonial(0);
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const prevIndex = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
                showTestimonial(prevIndex);
            });
        }

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
                showTestimonial(nextIndex);
            });
        }

        // Auto-rotate testimonials
        setInterval(() => {
            if (testimonialCards.length > 1) {
                const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
                showTestimonial(nextIndex);
            }
        }, 5000);
    }

    // WhatsApp Chat Widget
    function setupWhatsAppWidget() {
        console.log('Setting up WhatsApp widget...');
        
        const whatsappToggle = document.getElementById('whatsapp-toggle');
        const whatsappWidget = document.getElementById('whatsapp-widget');
        const whatsappClose = document.getElementById('whatsapp-close');
        const whatsappSend = document.getElementById('whatsapp-send');
        const whatsappInput = document.getElementById('whatsapp-input');
        const notification = document.querySelector('.whatsapp-notification');

        console.log('WhatsApp elements found:', {
            toggle: !!whatsappToggle,
            widget: !!whatsappWidget,
            close: !!whatsappClose,
            send: !!whatsappSend,
            input: !!whatsappInput,
            notification: !!notification
        });

        // Your WhatsApp number (replace with your actual number)
        const whatsappNumber = '254112462664';

        // Toggle widget visibility
        if (whatsappToggle && whatsappWidget) {
            whatsappToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('WhatsApp toggle clicked');
                whatsappWidget.classList.toggle('active');
                
                // Hide notification when widget is opened
                if (whatsappWidget.classList.contains('active') && notification) {
                    notification.style.display = 'none';
                }
                console.log('Widget active:', whatsappWidget.classList.contains('active'));
            });
        } else {
            console.error('WhatsApp toggle or widget not found!');
        }

        // Close widget
        if (whatsappClose && whatsappWidget) {
            whatsappClose.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('WhatsApp close clicked');
                whatsappWidget.classList.remove('active');
            });
        }

        // Send message function
        function sendWhatsAppMessage(message = '') {
            console.log('Sending WhatsApp message...');
            const defaultMessage = message || whatsappInput?.value || 'Hi Marylyne! I saw your portfolio and would like to discuss a project with you.';
            const encodedMessage = encodeURIComponent(defaultMessage);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            console.log('Opening WhatsApp URL:', whatsappURL);
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Close the widget
            if (whatsappWidget) {
                whatsappWidget.classList.remove('active');
            }
            
            // Clear input
            if (whatsappInput) {
                whatsappInput.value = '';
            }
        }

        // Send button click
        if (whatsappSend) {
            whatsappSend.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('WhatsApp send clicked');
                sendWhatsAppMessage();
            });
        }

        // Enter key press
        if (whatsappInput) {
            whatsappInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('Enter key pressed');
                    sendWhatsAppMessage();
                }
            });
        }

        // Show notification after page load
        setTimeout(() => {
            if (notification) {
                notification.style.display = 'flex';
                console.log('WhatsApp notification shown');
            }
        }, 3000);

        // Hide notification after some time
        setTimeout(() => {
            if (notification) {
                notification.style.display = 'none';
                console.log('WhatsApp notification hidden');
            }
        }, 15000);
        
        console.log('WhatsApp widget setup complete');
    }

    // Preloader functionality
    function hidePreloader() {
        const loader = elements.preloader;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            setTimeout(() => {
                loader.remove();
                document.body.style.overflow = 'visible';
            }, 500);
        }
    }

    // Navbar scroll effects
    function setupNavbar() {
        let lastScrollTop = 0;
        const navbar = elements.navbar;
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.classList.add('nav-hidden');
                } else {
                    navbar.classList.remove('nav-hidden');
                }
                lastScrollTop = scrollTop;
            });
        }
    }

    // Smooth scrolling for navigation links
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                    
                    // Update active nav item
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const menuToggle = elements.menuToggle;
        const navLinks = elements.navLinks;
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    // Contact form handling
    function setupContactForm() {
        const form = elements.contactForm;
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Create WhatsApp message
                const whatsappMessage = `Hi Marylyne! 

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

I'd like to discuss this project with you.`;
                
                // Send via WhatsApp
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappURL = `https://wa.me/254112462664?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
                
                // Reset form
                this.reset();
                alert('Thank you! Your message will be sent via WhatsApp.');
            });
        }
    }

    // Project filter functionality
    function setupProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Skill bars animation
    function setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            threshold: 0.7,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                    }, 500);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
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

    // Initialize all functionality
    function init() {
        // Hide preloader when page loads
        if (document.readyState === 'loading') {
            window.addEventListener('load', hidePreloader);
        } else {
            hidePreloader();
        }
        
        // Setup all components
        setupNavbar();
        setupDropdowns();
        setupTestimonials();
        setupWhatsAppWidget();
        setupSmoothScrolling();
        setupMobileMenu();
        setupContactForm();
        setupProjectFilter();
        setupSkillBars();
        
        // Handle window resize
        window.addEventListener('resize', handleDropdownResize);
    }

    // Start when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
