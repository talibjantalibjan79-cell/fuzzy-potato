document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after reveal
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class when out of view to re-animate
                // entry.target.classList.remove('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Initial Trigger for elements already in viewport (like Hero)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Particle Background Effect --- */
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize size, position, and duration
        const size = Math.random() * 5 + 2; // 2px to 7px
        const posX = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 20 + 10; // 10s to 30s
        const delay = Math.random() * 10; // 0s to 10s

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        // Remove and recreate when animation finishes to save memory
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    /* --- Number Counter Animation --- */
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.ceil(current) + (target > 500 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target + (target > 500 ? '+' : '');
            }
        };
        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            stats.forEach(stat => countUp(stat));
            hasCounted = true;
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* --- Testimonial Slider --- */
    const track = document.getElementById('testimonialTrack');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');

    let currentIndex = 0;

    function updateSlider() {
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (track && cards.length > 0) {
        updateSlider(); // Init

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        });

        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }, 5000);
    }

    /* --- Mobile Menu Toggle --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    // Quick inline styling for mobile menu toggle
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = navLinks.style.display === 'flex';
            if (isExpanded) {
                navLinks.style.display = 'none';
                if (window.innerWidth <= 768) navCta.style.display = 'none';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 11, 16, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--border-color)';

                if (window.innerWidth <= 768) {
                    navCta.style.display = 'block';
                    navCta.style.marginTop = '15px';
                    navLinks.appendChild(navCta);
                }

                mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style = '';
            navCta.style = '';
            if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});
