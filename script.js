document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typing Animation Feature ---
    const phrases = ["Web Developer", "Frontend Engineer", "Apex Planet Intern"];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingTarget = document.querySelector('.typing-text');

    function typeEffect() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            typingTarget.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingTarget.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 150;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2000; // Pause at end of text string
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 500; // Pause before restarting sequence
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // --- 2. Interactive Fluid Background Canvas ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 9000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 3. Scroll Reveal & Active Navigation Spy ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            // Toggle opacity active class
            if (sectionTop < triggerBottom) {
                section.classList.add('active');
            }

            // Track active section state inside viewport bounds
            const scrollPos = window.scrollY;
            if (scrollPos >= section.offsetTop - 150 && scrollPos < section.offsetTop + section.offsetHeight - 150) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial execution check

    // --- 4. Mobile Menu Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-links-active');
        burger.classList.toggle('toggle');
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-links-active');
            burger.classList.remove('toggle');
        });
    });
});
