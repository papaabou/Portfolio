// EmailJS Configuration
        const EMAILJS_CONFIG = {
            publicKey: 'Pbx3ckuUgYBfmGaJw',
            serviceId: 'service_x2dvsue',
            templateId: 'template_werhpm7'
        };

        // Initialize EmailJS
        (function() {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        })();

        // Mobile menu toggle
        const mobileMenuBtn = documentnt.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });

        // Form handling with EmailJS
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });

        function validateField(e) {
            const field = e.target;
            const errorSpan = field.nextElementSibling;
            let isValid = true;
            let errorMessage = '';

            switch(field.type) {
                case 'text':
                    if (field.value.trim().length < 2) {
                        isValid = false;
                        errorMessage = 'Ce champ doit contenir au moins 2 caractères';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        errorMessage = 'Veuillez entrer une adresse email valide';
                    }
                    break;
                case 'select-one':
                    if (!field.value) {
                        isValid = false;
                        errorMessage = 'Veuillez sélectionner un sujet';
                    }
                    break;
                default:
                    if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
                        isValid = false;
                        errorMessage = 'Le message doit contenir au moins 10 caractères';
                    }
            }

            if (!isValid) {
                field.classList.add('border-red-400');
                errorSpan.textContent = errorMessage;
                errorSpan.classList.remove('hidden');
            } else {
                field.classList.remove('border-red-400');
                errorSpan.classList.add('hidden');
            }

            return isValid;
        }

        function clearError(e) {
            const field = e.target;
            const errorSpan = field.nextElementSibling;
            field.classList.remove('border-red-400');
            errorSpan.classList.add('hidden');
        }

        // Hide messages
        function hideMessages() {
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
        }

        // Form submission with EmailJS
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Hide previous messages
            hideMessages();

            // Validate all fields
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) return;

            // Button loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Envoi en cours...';
            btnIcon.className = 'fas fa-spinner fa-spin ml-2';
            submitBtn.classList.add('opacity-75');

            try {
                // Prepare template parameters
                const templateParams = {
                    from_name: document.getElementById('firstName').value,
                    from_lastname: document.getElementById('lastName').value,
                    from_email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    to_name: 'Papa Abou MBAYE', // Votre nom
                    reply_to: document.getElementById('email').value
                };

                // Send email via EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );

                console.log('Email sent successfully:', response);

                // Success state
                btnText.textContent = 'Message envoyé !';
                btnIcon.className = 'fas fa-check ml-2';
                submitBtn.classList.remove('opacity-75');
                submitBtn.classList.add('form-success');
                successMessage.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = 'Envoyer le message';
                    btnIcon.className = 'fas fa-paper-plane ml-2';
                    submitBtn.classList.remove('form-success');
                    successMessage.classList.add('hidden');
                }, 3000);
                
            } catch (error) {
                console.error('Error sending email:', error);
                
                // Error state
                btnText.textContent = 'Erreur - Réessayer';
                btnIcon.className = 'fas fa-exclamation-triangle ml-2';
                submitBtn.classList.remove('opacity-75');
                submitBtn.classList.add('form-error');
                errorMessage.classList.remove('hidden');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = 'Envoyer le message';
                    btnIcon.className = 'fas fa-paper-plane ml-2';
                    submitBtn.classList.remove('form-error');
                    errorMessage.classList.add('hidden');
                }, 3000);
            }
        });

        // Duplicate skills for infinite scroll effect
        const scrollerInner = document.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);
        
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
