/**
 * Jerish A — Personal Portfolio JavaScript
 * Modern Vanilla ES6+ Scripting
 * Features: Light/Dark Mode (Default Off-White / Sage), Project Filtering, Scroll Reveal, Project Details Modal & Clipboard Copy
 */

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    initBgCanvas();
    initScrollReveal();
    initProjectFilters();
    initProjectModal();
    initCopyButtons();
    initContactForm();
    initMobileNav();
    initScrollHeader();
    updateYear();
});

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, parseInt(delay, 10));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   3. FILTERABLE PROJECTS GRID
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 280);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. PROJECT DETAILS MODAL
   -------------------------------------------------------------------------- */
const projectDetails = {
    1: {
        title: "Thara Boutique",
        category: "Full-Stack Web App",
        image: "assets/images/thara-flowers.png",
        description: "Thara Boutique is a full-stack e-commerce and order management application built for a boutique business. Enables seamless catalog browsing, custom bouquet options, shopping cart checkout, and real-time inventory tracking.",
        tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS Templates", "Tailwind CSS", "HTML5"],
        highlights: [
            "Designed RESTful API endpoints for catalog queries and customer transactions.",
            "Built responsive, accessible user workflows optimized for modern web browsers.",
            "Configured MongoDB database schemas for inventory items and order logs."
        ],
        link: "https://github.com/jerish2605-lang/thara-flowers"
    }
};

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const data = projectDetails[projectId];

            if (data && modal && modalBody) {
                modalBody.innerHTML = `
                    <div style="margin-bottom: 18px;">
                        <span style="font-family: var(--font-body); font-size: 0.8rem; color: var(--accent-sage); font-weight: 600;">${data.category}</span>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${data.title}</h2>
                    </div>

                    <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid var(--border-subtle);">
                        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>

                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px;">${data.description}</p>

                    <div style="margin-bottom: 20px;">
                        <h4 style="font-family: var(--font-body); font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 10px;">Engineering Highlights</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                            ${data.highlights.map(h => `<li style="font-size: 0.9rem; color: var(--text-primary); display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-sage); font-weight: bold;">•</span> ${h}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <h4 style="font-family: var(--font-body); font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 10px;">Technologies Used</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                            ${data.tech.map(t => `<span class="tag" style="background: var(--accent-sage-light); color: var(--accent-sage); border-color: var(--accent-sage-border);">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div>
                        <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
                            View Repository / Live Demo
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </a>
                    </div>
                `;

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/* --------------------------------------------------------------------------
   5. ONE-CLICK COPY TO CLIPBOARD
   -------------------------------------------------------------------------- */
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(err => {
                    showToast('Failed to copy text');
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                if (feedback) {
                    feedback.textContent = 'Please complete all required fields.';
                    feedback.className = 'form-feedback error';
                }
                return;
            }

            if (feedback) {
                feedback.textContent = 'Thank you! Your message has been sent successfully.';
                feedback.className = 'form-feedback success';
            }

            showToast('Message sent! Jerish will respond shortly.');
            form.reset();

            setTimeout(() => {
                if (feedback) feedback.textContent = '';
            }, 5000);
        });
    }
}

/* --------------------------------------------------------------------------
   7. MOBILE NAVIGATION & NAVBAR SCROLL
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
}

function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* --------------------------------------------------------------------------
   8. UTILITIES & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function updateYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* --------------------------------------------------------------------------
   9. GLOBAL 3D PARTICLE BACKGROUND (Three.js)
   -------------------------------------------------------------------------- */
function initBgCanvas() {
    const canvas = document.getElementById('bgCanvas');

    if (!canvas || typeof THREE === 'undefined') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry & positions (Sparse ~280 particles desktop, 160 mobile)
    const particleCount = window.innerWidth < 768 ? 160 : 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Cohesive palette complementing dark mode & sage theme
    const palette = [
        new THREE.Color('#4A5D4E'), // Sage Green
        new THREE.Color('#B8956A'), // Muted Gold / Amber
        new THREE.Color('#E8E6DE'), // Soft Off-White
        new THREE.Color('#607B65')  // Soft Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 55;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

        const chosenColor = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Multi-color vertex material with subtle opacity
    const material = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement & lerp tracking on window
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId = null;
    let isTabActive = true;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

    // Resize handler
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Render / Animation Loop
    function animate() {
        if (!isTabActive) return;

        if (!prefersReducedMotion) {
            // Gentle continuous rotation drift
            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.00015;

            // Parallax camera lerp
            targetX = mouseX * 1.8;
            targetY = -mouseY * 1.4;

            camera.position.x += (targetX - camera.position.x) * 0.04;
            camera.position.y += (targetY - camera.position.y) * 0.04;
            camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);

        if (!prefersReducedMotion) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    // Page Visibility API — Pause animation loop ONLY when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isTabActive = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else {
            isTabActive = true;
            if (!animationFrameId && !prefersReducedMotion) {
                animate();
            }
        }
    });

    // Initial frame
    animate();
}
