// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = contactSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add active navigation state
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initialize active state
    updateActiveNavLink();

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sectionsToObserve = document.querySelectorAll('.section');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add mobile menu toggle functionality (for future use)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Add mobile menu functionality
        mobileMenuButton.addEventListener('click', function() {
            navContainer.classList.toggle('mobile-menu-open');
        });
        
        // Only add mobile menu on smaller screens
        if (window.innerWidth <= 768) {
            navbar.appendChild(mobileMenuButton);
        }
    };

    // Handle window resize
    window.addEventListener('resize', function() {
        updateActiveNavLink();
    });

    // Advanced animations and effects
    
    // Parallax scrolling effect
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section::before');
        if (parallax) {
            const speed = scrolled * 0.5;
        }
    }
    
    // Mouse follower effect
    function createMouseFollower() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add cursor styles
        const cursorStyles = `
            .cursor-follower {
                position: fixed;
                width: 20px;
                height: 20px;
                background: rgba(74, 222, 128, 0.3);
                border-radius: 50%;
                pointer-events: none;
                mix-blend-mode: difference;
                z-index: 9999;
                transition: transform 0.1s ease;
            }
            
            .cursor-follower.clicked {
                transform: scale(0.5);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = cursorStyles;
        document.head.appendChild(styleSheet);
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicked');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicked');
        });
    }
    
    // Typing animation for hero title
    function typewriterEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typeChar() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }
    
    // Animated counter
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Particle system
    function createParticleSystem() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.innerHTML = `
            <style>
                .particles-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #4ade80;
                    border-radius: 50%;
                    opacity: 0.6;
                }
                
                .particle:nth-child(odd) {
                    background: rgba(74, 222, 128, 0.3);
                    animation: particle1 15s infinite linear;
                }
                
                .particle:nth-child(even) {
                    background: rgba(74, 222, 128, 0.5);
                    animation: particle2 20s infinite linear;
                }
            </style>
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Magnetic effect for buttons
    function addMagneticEffect() {
        const magneticElements = document.querySelectorAll('.cta-button, .nav-link, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const { offsetX, offsetY } = e;
                const { offsetWidth, offsetHeight } = element;
                
                const centerX = offsetWidth / 2;
                const centerY = offsetHeight / 2;
                
                const deltaX = (offsetX - centerX) / centerX;
                const deltaY = (offsetY - centerY) / centerY;
                
                element.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    // Text reveal animation
    function revealTextOnScroll() {
        const textElements = document.querySelectorAll('h1, h2, p');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        textElements.forEach(element => {
            revealObserver.observe(element);
        });
        
        // Add text reveal styles
        const textRevealStyles = `
            h1, h2, p {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .text-reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = textRevealStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Company logos stagger animation
    function staggerCompanyLogos() {
        const logos = document.querySelectorAll('.company-logo');
        
        logos.forEach((logo, index) => {
            logo.style.setProperty('--i', index);
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(20px)';
            logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            logo.style.transitionDelay = (index * 0.1) + 's';
        });
        
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const logos = entry.target.querySelectorAll('.company-logo');
                    logos.forEach(logo => {
                        logo.style.opacity = '1';
                        logo.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
        const companiesSection = document.querySelector('.companies-section');
        if (companiesSection) {
            logoObserver.observe(companiesSection);
        }
    }
    
    // Smooth page transitions
    function addPageTransitions() {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <style>
                .page-transition-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #0a0a0a, #1a1a1a);
                    z-index: 9999;
                    opacity: 1;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                }
                
                .page-transition-overlay.hidden {
                    opacity: 0;
                }
            </style>
        `;
        
        document.body.appendChild(overlay);
        
        // Hide overlay after page load
        setTimeout(() => {
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 100);
    }
    
    // Initialize all advanced features
    function initAdvancedAnimations() {
        // Only run on devices that can handle animations
        if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            createMouseFollower();
            createParticleSystem();
        }
        
        addMagneticEffect();
        revealTextOnScroll();
        staggerCompanyLogos();
        addPageTransitions();
        
        // Add parallax scrolling
        window.addEventListener('scroll', handleParallax);
    }
    
    // Enhanced profile avatar interactions
    function enhanceProfileAvatar() {
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImage) {
            // Create multiple spirit layers
            for (let i = 0; i < 3; i++) {
                const spiritLayer = document.createElement('div');
                spiritLayer.className = `spirit-layer spirit-layer-${i}`;
                profileImage.appendChild(spiritLayer);
            }
            
            // Add spirit layer styles
            const spiritStyles = `
                .spirit-layer {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 120%;
                    height: 120%;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: -1;
                }
                
                .spirit-layer-0 {
                    background: radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0.1) 60%, transparent 100%);
                    animation: spiritPulse 2s ease-in-out infinite;
                }
                
                .spirit-layer-1 {
                    background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(74, 222, 128, 0.1) 70%, transparent 100%);
                    animation: spiritPulse 2.5s ease-in-out infinite reverse;
                    width: 140%;
                    height: 140%;
                }
                
                .spirit-layer-2 {
                    background: radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.05) 80%, transparent 100%);
                    animation: spiritPulse 3s ease-in-out infinite;
                    width: 160%;
                    height: 160%;
                }
                
                @keyframes spiritPulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
                        opacity: 0.7;
                    }
                }
                
                .profile-image:hover .spirit-layer {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                
                .profile-image:hover .spirit-layer-0 {
                    animation-play-state: running;
                }
                
                .profile-image:hover .spirit-layer-1 {
                    animation-play-state: running;
                    transform: translate(-50%, -50%) scale(1.3);
                }
                
                .profile-image:hover .spirit-layer-2 {
                    animation-play-state: running;
                    transform: translate(-50%, -50%) scale(1.4);
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = spiritStyles;
            document.head.appendChild(styleSheet);
            
            // Mouse movement interaction
            profileImage.addEventListener('mousemove', (e) => {
                const rect = profileImage.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const rotateX = (y / rect.height) * 20;
                const rotateY = (x / rect.width) * -20;
                
                profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                
                // Update spirit layers based on mouse position
                const spiritLayers = profileImage.querySelectorAll('.spirit-layer');
                spiritLayers.forEach((layer, index) => {
                    const intensity = (index + 1) * 0.3;
                    layer.style.transform = `translate(${-50 + (x / rect.width) * intensity * 10}%, ${-50 + (y / rect.height) * intensity * 10}%) scale(${1.2 + intensity * 0.2}) rotate(${(x + y) * intensity}deg)`;
                });
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                
                const spiritLayers = profileImage.querySelectorAll('.spirit-layer');
                spiritLayers.forEach((layer, index) => {
                    const baseScale = 0.8 + (index * 0.1);
                    layer.style.transform = `translate(-50%, -50%) scale(${baseScale}) rotate(0deg)`;
                });
            });
            
            // Click effect
            profileImage.addEventListener('click', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'profile-ripple';
                profileImage.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
            });
            
            // Add ripple styles
            const rippleStyles = `
                .profile-ripple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(74, 222, 128, 0.6) 0%, rgba(74, 222, 128, 0.1) 70%, transparent 100%);
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 1s ease-out;
                    pointer-events: none;
                    z-index: 10;
                }
                
                @keyframes rippleEffect {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200%;
                        height: 200%;
                        opacity: 0;
                    }
                }
            `;
            
            const rippleStyleSheet = document.createElement('style');
            rippleStyleSheet.textContent = rippleStyles;
            document.head.appendChild(rippleStyleSheet);
        }
    }
    
    // Start advanced animations after a delay
    setTimeout(() => {
        initAdvancedAnimations();
        enhanceProfileAvatar();
    }, 500);
});
