document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // A. SPOTLIGHT MOUSE VECTOR TRACKING ENGINE
    // =================================================================
    const glowEl = document.getElementById('mouse-glow');
    if (glowEl) {
        window.addEventListener('mousemove', (e) => {
            glowEl.style.left = `${e.clientX}px`;
            glowEl.style.top = `${e.clientY}px`;
        });
    }

    // =================================================================
    // B. MULTI-MODE THEME LAYOUT SWITCHER
    // =================================================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    const rootHTML = document.documentElement;

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-mode');
            rootHTML.setAttribute('data-theme', mode);
        });
    });

    // =================================================================
    // C. TERMINAL CLI TYPEWRITER CONTROLLER
    // =================================================================
    const textStrings = [
        "you found /sid/log.",
        "hello, world.",
        "init deep_learning_pipeline...",
        "fetching satellite radar imagery...",
        "compiling research notes...",
        "Messi is the GOAT.",
        "Python is awesome!"
    ];
    let stringIdx = 0;
    let charIdx = 0;
    let currentModeDeleting = false;
    const targetOutputElement = document.getElementById('typewriter-txt');

    function performTypeCycle() {
        if (!targetOutputElement) return;
        
        const globalString = textStrings[stringIdx];
        if (currentModeDeleting) {
            targetOutputElement.textContent = globalString.substring(0, charIdx - 1);
            charIdx--;
        } else {
            targetOutputElement.textContent = globalString.substring(0, charIdx + 1);
            charIdx++;
        }

        let operationalDelay = currentModeDeleting ? 30 : 60;

        if (!currentModeDeleting && charIdx === globalString.length) {
            operationalDelay = 2000; 
            currentModeDeleting = true;
        } else if (currentModeDeleting && charIdx === 0) {
            currentModeDeleting = false;
            stringIdx = (stringIdx + 1) % textStrings.length;
            operationalDelay = 300; 
        }
        setTimeout(performTypeCycle, operationalDelay);
    }
    if (targetOutputElement) setTimeout(performTypeCycle, 600);

    // =================================================================
    // D. INTERSECTION OBSERVER & COUNTERS RUNTIME
    // =================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const animateValueCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const stepFunction = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(stepFunction);
        };
        window.requestAnimationFrame(stepFunction);
    };

    const revealObserverEngine = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const metricsToRun = entry.target.querySelectorAll('.metric-value[data-val]');
                metricsToRun.forEach(metric => {
                    if (!metric.classList.contains('processed')) {
                        const finalTarget = parseInt(metric.getAttribute('data-val'));
                        animateValueCounter(metric, 0, finalTarget, 1200);
                        metric.classList.add('processed');
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    revealElements.forEach(el => revealObserverEngine.observe(el));

    // =================================================================
    // E. LIVE ASYNCHRONOUS GITHUB API CALLER
    // =================================================================
    async function getLiveGitHubStats() {
        const repoDisplay = document.getElementById('api-repos');
        const followerDisplay = document.getElementById('api-followers');
        if (!repoDisplay || !followerDisplay) return;

        try {
            const res = await fetch('https://api.github.com/users/SID4288');
            if (!res.ok) throw new Error();
            const profileData = await res.json();
            animateValueCounter(repoDisplay, 0, profileData.public_repos || 9, 1000);
            animateValueCounter(followerDisplay, 0, profileData.followers || 24, 1000);
        } catch (e) {
            repoDisplay.textContent = "9";
            followerDisplay.textContent = "24";
        }
    }
    setTimeout(getLiveGitHubStats, 500);

    // =================================================================
    // F. THEME-AWARE INTERACTIVE CONSTELLATION ENGINE
    // =================================================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class CanvasNode {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4; 
                this.vy = (Math.random() - 0.5) * 0.4;
                this.baseRadius = Math.random() * 1.5 + 1;
                this.radius = this.baseRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 1.2;
                        this.y -= (dy / dist) * force * 1.2;
                        this.radius = this.baseRadius + force * 1.5;
                    } else {
                        if (this.radius > this.baseRadius) this.radius -= 0.1;
                    }
                }
            }

            draw(colorRGB) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = colorRGB;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const densityCount = Math.min(90, Math.floor((canvas.width * canvas.height) / 18000));
            for (let i = 0; i < densityCount; i++) {
                particles.push(new CanvasNode());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentStyles = getComputedStyle(document.documentElement);
            const accentColor = currentStyles.getPropertyValue('--accent').trim();
            const secondaryColor = currentStyles.getPropertyValue('--accent-secondary').trim();

            particles.forEach(node => {
                node.update();
                node.draw(accentColor);
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = secondaryColor;
                        ctx.globalAlpha = ((110 - dist) / 110) * 0.12; 
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = particles[i].x - mouse.x;
                    let dy = particles[i].y - mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = accentColor;
                        ctx.globalAlpha = ((mouse.radius - dist) / mouse.radius) * 0.22;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }

        resizeCanvas();
        animateCanvas();
    }

    // =================================================================
    // G. SECURE TERMINAL TRANSMISSION (AJAX CONTACT FORM CONTROLLER)
    // =================================================================
    const terminalForm = document.querySelector('.form-body');
    const submitBtn = document.querySelector('.form-submit-btn');

    if (terminalForm && submitBtn) {
        terminalForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> routing_packet...`;

            const formData = new FormData(terminalForm);

            try {
                const response = await fetch(terminalForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    submitBtn.style.borderColor = "#27c93f";
                    submitBtn.style.color = "#27c93f";
                    submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> [SUCCESS] Packet routed cleanly!`;
                    terminalForm.reset(); 
                } else {
                    throw new Error();
                }
            } catch (error) {
                submitBtn.style.borderColor = "#ef4444";
                submitBtn.style.color = "#ef4444";
                submitBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> [ERROR] Transmission dropped.`;
            }

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.borderColor = "";
                submitBtn.style.color = "";
                submitBtn.innerHTML = originalBtnText;
            }, 4000);
        });
    }

    // =================================================================
    // H. SMOOTH SCROLLING FOR NAV LINKS
    // =================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            let targetPosition = 0;

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                const headerOffset = 54;
                targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
            }

            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percent = Math.min(progress / duration, 1);
                
                const ease = percent < 0.5 
                    ? 4 * percent * percent * percent 
                    : 1 - Math.pow(-2 * percent + 2, 3) / 2;
                    
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            });
        });
    });
});