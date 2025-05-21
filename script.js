document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Mobile Navigation
    const initMobileMenu = () => {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        
        if (!burger || !navLinks) return;
        
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    };

    // Scroll Effect for Header
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    };

    // Scroll Animation
    const initScrollAnimation = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    };

    // Smooth scrolling for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialize all functions
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimation();
    initSmoothScroll();

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const subject = this.querySelector('[name="subject"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Construct the mailto URL
            const mailtoUrl = `mailto:danychege28@gmail.com?subject=${encodeURIComponent(subject || 'Contact Form Message')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Open the default email client
            window.location.href = mailtoUrl;

            // Reset form and button after a short delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});