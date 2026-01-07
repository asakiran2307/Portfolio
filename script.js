// ==========================================
// PORTFOLIO - AWARD-WINNING JAVASCRIPT
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initCustomCursor();
    initLoadingScreen();
    initParticleSystem();
    initScrollAnimations();
    initTypewriter();
    initStatsCounter();
    initSkillBars();
    initProjectFilter();
    initMobileMenu();
    initContactForm();
    initNavigation();
    initIntersectionObserver();
}

// ==========================================
// CUSTOM CURSOR
// ==========================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor
    function animate() {
        // Smooth cursor movement - increased speed
        cursorX += (mouseX - cursorX) * 0.5;  // Increased from 0.3
        cursorY += (mouseY - cursorY) * 0.5;  // Increased from 0.3

        followerX += (mouseX - followerX) * 0.2;  // Increased from 0.1
        followerY += (mouseY - followerY) * 0.2;  // Increased from 0.1

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .project-card, .skill-category');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('grow');
        });

        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('grow');
        });
    });

    // Magnetic effect for buttons
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;

            const distX = e.clientX - btnX;
            const distY = e.clientY - btnY;

            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 100) {
                const factor = (100 - distance) / 100;
                const moveX = distX * factor * 0.3;
                const moveY = distY * factor * 0.3;

                gsap.to(btn, {
                    x: moveX,
                    y: moveY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const percentage = document.querySelector('.loading-percentage');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;

        percentage.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }, 500);
        }
    }, 100);
}

// ==========================================
// PARTICLE SYSTEM (THREE.JS)
// ==========================================
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x00D9FF,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x = mouseY * 0.1;
        particlesMesh.rotation.y = mouseX * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==========================================
// SCROLL ANIMATIONS (GSAP)
// ==========================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // About section animations
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Skill categories stagger
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Project cards stagger
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Timeline items
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
    });
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const words = typewriterElement.getAttribute('data-words').split(',').map(w => w.trim().replace(/['"]/g, ''));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            text = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        typewriterElement.textContent = text;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ==========================================
// STATS COUNTER
// ==========================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// PROJECT FILTER
// ==========================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        display: 'block',
                        ease: 'power2.out'
                    });
                    card.classList.remove('hidden');
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            card.classList.add('hidden');
                        },
                        ease: 'power2.in'
                    });
                }
            });
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ==========================================
// CONTACT FORM
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');

        // Trigger confetti
        launchConfetti();

        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.classList.remove('success');
        }, 3000);
    });
}

// ==========================================
// CONFETTI EFFECT
// ==========================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#00D9FF', '#6B5B95', '#FF6B9D', '#4ECDC4', '#F093FB'];

    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();

            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;

            // Remove if off screen
            if (piece.y > canvas.height) {
                confetti.splice(index, 1);
            }
        });

        if (confetti.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            canvas.classList.remove('active');
        }
    }

    animateConfetti();
}

// ==========================================
// NAVIGATION SCROLL EFFECT
// ==========================================
function initNavigation() {
    const nav = document.getElementById('mainNav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

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
}

// ==========================================
// INTERSECTION OBSERVER
// ==========================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.about-text, .about-image, .skill-category, .tech-tags, .project-card, .timeline-item'
    );

    elementsToObserve.forEach(el => observer.observe(el));
}

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
(function () {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Fun animation when Konami code is entered
        const body = document.body;
        body.style.animation = 'rainbow 2s linear infinite';

        setTimeout(() => {
            body.style.animation = '';
        }, 5000);

        // Add rainbow keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        console.log('%c🎉 You found the secret! You are a true developer! 🎉', 'font-size: 20px; color: #00D9FF; font-weight: bold;');
    }
})();

// Console message for recruiters
console.log('%c👋 Hello there!', 'font-size: 32px; font-weight: bold; color: #00D9FF;');
console.log('%c🚀 Looking for talent? Let\'s talk!', 'font-size: 18px; color: #6B5B95;');
console.log('%c💼 Check out my work and get in touch!', 'font-size: 16px; color: #00D9FF;');
console.log('%c\n     _____\n    /     \\\n   | () () |\n    \\  ^  /\n     |||||\n     |||||\n', 'font-family: monospace; color: #00D9FF;');

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('SW registered:', registration);
        // }).catch(error => {
        //     console.log('SW registration failed:', error);
        // });
    });
}
