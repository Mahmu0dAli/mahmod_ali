// Update active nav link on scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Typewriter Effect
    const typewriterText = "I'm a passionate frontend developer, specialized in creating interactive and engaging web experiences using the latest technologies.";
    const typewriterElement = document.getElementById('typewriter-text');
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!typewriterElement) return;
        
        const currentText = typewriterText.substring(0, charIndex);
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && charIndex < typewriterText.length) {
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        }
        
        // Change direction when reaching the end or beginning
        if (!isDeleting && charIndex === typewriterText.length) {
            // Wait before starting to delete
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Wait before starting to type again
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }

    // Start typewriter effect after page loads
    setTimeout(typeWriter, 1000);

    // Animate name highlight
    const highlightElement = document.querySelector('.highlight');
    if (highlightElement) {
        setTimeout(() => {
            highlightElement.classList.add('animate');
        }, 1500);
    }

    // Scroll Animations for Elements
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = new IntersectionObserver(function(entries, animateSkillBars) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 300);
                animateSkillBars.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        animateSkillBars.observe(bar);
    });

    // Contact Form Submission (يفتح تطبيق البريد لدى الزائر عبر mailto)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields before submitting.');
                return;
            }

            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailtoLink = `mailto:el7oda.official@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});