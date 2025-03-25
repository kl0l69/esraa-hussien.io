// Ensure GSAP and ScrollTrigger are loaded
if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Please include the GSAP and ScrollTrigger libraries.');
    throw new Error('GSAP/ScrollTrigger missing');
}

// Global variables for animation control
let isAnimating = true;
let hasInteracted = false;

// Stars Effect with Twinkling
const starsCanvas = document.getElementById('stars-canvas');
let starsCtx, starsArray = [];

if (starsCanvas) {
    starsCtx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    class Star {
        constructor() {
            this.x = Math.random() * starsCanvas.width;
            this.y = Math.random() * starsCanvas.height;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.5 + 0.1;
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
            this.opacity = 1;
        }

        update() {
            this.y += this.speed;
            if (this.y > starsCanvas.height) {
                this.y = 0;
                this.x = Math.random() * starsCanvas.width;
            }
            this.opacity = Math.sin(Date.now() * this.twinkleSpeed) * 0.5 + 0.5;
        }

        draw() {
            if (starsCtx) {
                starsCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                starsCtx.beginPath();
                starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                starsCtx.fill();
            }
        }
    }

    function initStars() {
        starsArray = [];
        const numberOfStars = window.innerWidth <= 768 ? 30 : 50;
        for (let i = 0; i < numberOfStars; i++) {
            starsArray.push(new Star());
        }
    }

    function animateStars() {
        if (!isAnimating) return;
        if (starsCtx && !document.body.classList.contains('day')) {
            starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            starsArray.forEach(star => {
                star.update();
                star.draw();
            });
        } else if (starsCtx) {
            starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        }
        requestAnimationFrame(animateStars);
    }

    initStars();
    animateStars();
}

// Butterflies Effect with Flapping
const butterfliesCanvas = document.getElementById('butterflies-canvas');
let butterfliesCtx, butterfliesArray = [];
let butterflyFlapSpeed = 0.1;

if (butterfliesCanvas) {
    butterfliesCtx = butterfliesCanvas.getContext('2d');
    butterfliesCanvas.width = window.innerWidth;
    butterfliesCanvas.height = window.innerHeight;

    class Butterfly {
        constructor() {
            this.x = Math.random() * butterfliesCanvas.width;
            this.y = Math.random() * butterfliesCanvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.flapAngle = 0;
            this.directionAngle = Math.random() * Math.PI * 2;
        }

        update() {
            this.directionAngle += (Math.random() - 0.5) * 0.1;
            this.speedX = Math.cos(this.directionAngle) * 2;
            this.speedY = Math.sin(this.directionAngle) * 2;
            this.x += this.speedX;
            this.y += this.speedY;
            this.flapAngle += butterflyFlapSpeed;

            if (this.x < 0 || this.x > butterfliesCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > butterfliesCanvas.height) this.speedY *= -1;
        }

        draw() {
            if (butterfliesCtx) {
                butterfliesCtx.fillStyle = document.body.classList.contains('day') ? 'rgba(255, 171, 64, 0.7)' : 'rgba(255, 204, 128, 0.7)';
                butterfliesCtx.save();
                butterfliesCtx.translate(this.x, this.y);
                butterfliesCtx.rotate(this.directionAngle);
                butterfliesCtx.scale(1, Math.sin(this.flapAngle) * 0.2 + 0.8);
                butterfliesCtx.beginPath();
                butterfliesCtx.arc(0, 0, this.size, 0, Math.PI * 2);
                butterfliesCtx.fill();
                butterfliesCtx.restore();
            }
        }
    }

    function initButterflies() {
        butterfliesArray = [];
        const numberOfButterflies = window.innerWidth <= 768 ? 5 : 10;
        for (let i = 0; i < numberOfButterflies; i++) {
            butterfliesArray.push(new Butterfly());
        }
    }

    function animateButterflies() {
        if (!isAnimating) return;
        if (butterfliesCtx) {
            butterfliesCtx.clearRect(0, 0, butterfliesCanvas.width, butterfliesCanvas.height);
            butterfliesArray.forEach(butterfly => {
                butterfly.update();
                butterfly.draw();
            });
        }
        requestAnimationFrame(animateButterflies);
    }

    initButterflies();
    animateButterflies();
}

// Particles Effect with Glow and Connections
const particlesCanvas = document.getElementById('particles-canvas');
let particlesCtx, particlesArray = [];

if (particlesCanvas) {
    particlesCtx = particlesCanvas.getContext('2d');
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.05;

            if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
        }

        draw() {
            if (particlesCtx) {
                particlesCtx.fillStyle = document.body.classList.contains('day') ? 'rgba(255, 171, 64, 0.8)' : 'rgba(255, 204, 128, 0.8)';
                particlesCtx.beginPath();
                particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                particlesCtx.fill();
            }
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (particlesCanvas.width * particlesCanvas.height) / (window.innerWidth <= 768 ? 30000 : 20000);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        if (!isAnimating) return;
        if (particlesCtx) {
            particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        particlesCtx.beginPath();
                        particlesCtx.strokeStyle = document.body.classList.contains('day') ? `rgba(255, 171, 64, ${1 - distance / 100})` : `rgba(255, 204, 128, ${1 - distance / 100})`;
                        particlesCtx.lineWidth = 1;
                        particlesCtx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        particlesCtx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        particlesCtx.stroke();
                    }
                }

                if (particlesArray[i].size <= 0.2) {
                    particlesArray.splice(i, 1);
                    i--;
                    particlesArray.push(new Particle());
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

// Resize Canvas on Window Resize with Debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (starsCanvas) {
            starsCanvas.width = window.innerWidth;
            starsCanvas.height = window.innerHeight;
            initStars();
        }
        if (butterfliesCanvas) {
            butterfliesCanvas.width = window.innerWidth;
            butterfliesCanvas.height = window.innerHeight;
            initButterflies();
        }
        if (particlesCanvas) {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
            initParticles();
        }
    }, 200);
});

// Moon and Sun Animation
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

function animateCelestialBodies() {
    gsap.timeline({ repeat: -1 })
        .to(moon, {
            x: '90vw',
            duration: 10,
            ease: 'power1.inOut',
            onStart: () => {
                document.body.classList.remove('day');
            }
        })
        .to(moon, {
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut'
        })
        .to(sun, {
            x: '90vw',
            duration: 10,
            ease: 'power1.inOut',
            onStart: () => {
                document.body.classList.add('day');
                sun.style.opacity = 1;
            }
        })
        .to(sun, {
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut'
        })
        .set(moon, { x: '-10vw', opacity: 1 })
        .set(sun, { x: '-10vw' });
}

animateCelestialBodies();

// Typing Effect for Hero Section (Run Once on Page Load)
let hasTyped = false;

function typeText(element, speed = 50, callback) {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            if (callback) callback();
        }
    }, speed);
}

function startTypingEffect() {
    if (hasTyped) return;
    hasTyped = true;

    const elements = document.querySelectorAll('.typing-text');
    let index = 0;

    function typeNext() {
        if (index < elements.length) {
            typeText(elements[index], 50, () => {
                index++;
                typeNext();
            });
        }
    }

    elements.forEach(element => {
        element.style.visibility = 'hidden';
    });
    typeNext();
}

document.addEventListener('DOMContentLoaded', startTypingEffect);

// Day/Night Mode and Music Control with Fade Effect
const musicBtn = document.querySelector('#musicButton');
const musicIcon = document.querySelector('.music-icon');
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');
let isPlaying = false;

// التحقق من تفاعل المستخدم
document.addEventListener('click', () => {
    hasInteracted = true;
});

document.addEventListener('touchstart', () => {
    hasInteracted = true;
}, { passive: true });

function fadeAudio(audio, targetVolume, duration) {
    if (!audio) return;

    const steps = 50;
    const stepDuration = duration / steps;
    const volumeStep = (targetVolume - audio.volume) / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audio.volume = targetVolume;
            if (targetVolume === 0) audio.pause();
        } else {
            audio.volume = Math.min(1, Math.max(0, audio.volume + volumeStep));
            currentStep++;
        }
    }, stepDuration);
}

function toggleMusicAndMode() {
    if (!hasInteracted) {
        console.warn('User interaction required to play audio.');
        return;
    }

    if (!backgroundMusic) {
        console.error('Audio element not found.');
        return;
    }

    if (clickSound && hasInteracted) {
        clickSound.play().catch(err => {
            console.error('Error playing click sound:', err);
        });
    }

    if (isPlaying) {
        fadeAudio(backgroundMusic, 0, 1000);
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        butterflyFlapSpeed = 0.1;
    } else {
        backgroundMusic.volume = 0;
        backgroundMusic.play().then(() => {
            fadeAudio(backgroundMusic, 1, 1000);
        }).catch(err => {
            console.error('Error playing audio:', err);
        });
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');

        butterflyFlapSpeed = 0.3;
        setTimeout(() => {
            butterflyFlapSpeed = 0.1;
        }, 2000);
    }
    isPlaying = !isPlaying;
}

if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusicAndMode);
    musicBtn.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        toggleMusicAndMode();
    });
}

// Parallax Effect on Hero Section with Fixed Scrolling
const heroSection = document.querySelector('.hero');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const direction = scrollPosition > lastScrollPosition ? 'down' : 'up';
    lastScrollPosition = scrollPosition;

    if (heroSection) {
        let translateY = scrollPosition * 0.3;
        // منع التحريك لأعلى أكثر من الموقع الأصلي
        if (direction === 'up') {
            translateY = Math.max(0, translateY);
        }
        // تحديد الحد الأقصى للتحريك لأسفل بناءً على ارتفاع القسم
        const heroHeight = heroSection.offsetHeight;
        const maxTranslateY = heroHeight * 0.3;
        translateY = Math.min(translateY, maxTranslateY);
        heroSection.style.transform = `translateY(${translateY}px)`;
    }
});

// Navbar Hide/Show on Scroll for Mobile
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const direction = scrollTop > lastScrollTop ? 'down' : 'up';

        if (direction === 'down') {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 150);
    }
});

// Fade-In Effects for Sections (بديل لتأثير الـ 3D)
const fadeInSections = document.querySelectorAll('.fade-in-section');

fadeInSections.forEach(section => {
    const sectionCanvas = document.createElement('canvas');
    sectionCanvas.classList.add('section-particles');
    section.appendChild(sectionCanvas);
    sectionCanvas.width = section.offsetWidth;
    sectionCanvas.height = section.offsetHeight;
    const sectionCtx = sectionCanvas.getContext('2d');
    let sectionParticles = [];

    class SectionParticle {
        constructor() {
            this.x = Math.random() * sectionCanvas.width;
            this.y = Math.random() * sectionCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > sectionCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > sectionCanvas.height) this.speedY *= -1;
        }

        draw() {
            if (sectionCtx) {
                sectionCtx.fillStyle = 'rgba(255, 171, 64, 0.5)';
                sectionCtx.beginPath();
                sectionCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                sectionCtx.fill();
            }
        }
    }

    function initSectionParticles() {
        sectionParticles = [];
        const numberOfParticles = window.innerWidth <= 768 ? 5 : 10;
        for (let i = 0; i < numberOfParticles; i++) {
            sectionParticles.push(new SectionParticle());
        }
    }

    function animateSectionParticles() {
        if (!isAnimating) return;
        if (section.classList.contains('visible') && sectionCtx) {
            sectionCtx.clearRect(0, 0, sectionCanvas.width, sectionCanvas.height);
            sectionParticles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }
        requestAnimationFrame(animateSectionParticles);
    }

    initSectionParticles();
    animateSectionParticles();

    // تأثير الظهور التدريجي باستخدام GSAP
    gsap.fromTo(
        section,
        {
            opacity: 0,
            y: 20, // بدلاً من rotationY
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    section.classList.add('visible');
                    console.log(`Section ${section.id} entered viewport`);
                },
                onLeaveBack: () => {
                    section.classList.remove('visible');
                },
            },
        }
    );

    // تأثير التفاعل عند التمرير
    ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onUpdate: self => {
            const progress = self.progress;
            section.style.boxShadow = `0 ${5 + progress * 10}px ${10 + progress * 15}px rgba(0, 0, 0, ${0.2 + progress * 0.1})`;
        },
    });

    // تأثير التكبير عند التفاعل
    section.addEventListener('mouseenter', () => {
        gsap.to(section, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    section.addEventListener('mouseleave', () => {
        gsap.to(section, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    section.addEventListener('touchstart', () => {
        gsap.to(section, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, { passive: true });

    section.addEventListener('touchend', () => {
        gsap.to(section, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, { passive: true });
});

// Hamburger Menu Functionality
const hamburgerBtn = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
let isSidebarOpen = false;

function toggleSidebar() {
    hasInteracted = true;

    if (clickSound && hasInteracted) {
        clickSound.play().catch(err => {
            console.error('Error playing click sound:', err);
        });
    }

    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
        sidebar.classList.add('active');
        hamburgerBtn.querySelector('i').classList.remove('fa-bars');
        hamburgerBtn.querySelector('i').classList.add('fa-times');
    } else {
        sidebar.classList.remove('active');
        hamburgerBtn.querySelector('i').classList.remove('fa-times');
        hamburgerBtn.querySelector('i').classList.add('fa-bars');
    }
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleSidebar);
    hamburgerBtn.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        toggleSidebar();
    });
}

if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isSidebarOpen = false;
            sidebar.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.remove('fa-times');
            hamburgerBtn.querySelector('i').classList.add('fa-bars');
        });
    });
}

// Chatbot Functionality with Typing Effect
const chatbotBtn = document.querySelector('.chatbot-btn');
const chatbotWindow = document.querySelector('.chatbot-window');
let isChatbotOpen = false;

function toggleChatbot() {
    hasInteracted = true;

    if (clickSound && hasInteracted) {
        clickSound.play().catch(err => {
            console.error('Error playing click sound:', err);
        });
    }

    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
        chatbotWindow.classList.add('active');
    } else {
        chatbotWindow.classList.remove('active');
    }
}

if (chatbotBtn) {
    chatbotBtn.addEventListener('click', toggleChatbot);
    chatbotBtn.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        toggleChatbot();
    });
}

function typeResponse(text, element, speed = 50) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const content = doc.body.textContent;
    element.innerHTML = '';

    let i = 0;
    const typing = setInterval(() => {
        if (i < content.length) {
            element.textContent += content.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            element.innerHTML = text;
        }
    }, speed);
}

document.querySelectorAll('.chatbot-question').forEach(button => {
    button.addEventListener('click', () => {
        if (clickSound && hasInteracted) {
            clickSound.play().catch(err => {
                console.error('Error playing click sound:', err);
            });
        }

        const question = button.getAttribute('data-question');
        const chatbotResponse = document.getElementById('chatbot-response');
        let response = '';
        switch (question) {
            case 'book':
                response = 'لحجز جلسة، يرجى التواصل مع إسراء مباشرة عبر الواتساب: <a href="https://wa.me/+201156967558" target="_blank">اضغط هنا</a>';
                break;
            case 'services':
                response = 'أقدم خدمات تشمل: العلاج السلوكي المعرفي (CBT)، إدارة الاكتئاب والقلق، دعم الصحة العقلية للأطفال والمراهقين، والإرشاد الأسري. يمكنك معرفة المزيد في قسم الخدمات.';
                break;
            case 'contact':
                response = 'يمكنك التواصل مع إسراء عبر الواتساب: <a href="https://wa.me/+201156967558" target="_blank">اضغط هنا</a> أو الفيسبوك: <a href="https://www.facebook.com/profile.php?id=61572763863199" target="_blank">اضغط هنا</a>';
                break;
            default:
                response = 'عذرًا، لم أفهم سؤالك. يرجى اختيار أحد الأسئلة المتاحة.';
        }
        console.log(`Chatbot question clicked: ${question}`);
        typeResponse(response, chatbotResponse);
    });
});

// Back to Top Button (بديل لـ GSAP scrollTo)
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        if (clickSound && hasInteracted) {
            clickSound.play().catch(err => {
                console.error('Error playing click sound:', err);
            });
        }

        // استخدام window.scrollTo بدلاً من GSAP
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Ripple Effect on Click/Touch
function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    document.querySelector('.ripple-container').appendChild(ripple);

    const size = Math.max(window.innerWidth, window.innerHeight) / 5;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('click', createRipple);
document.addEventListener('touchstart', createRipple, { passive: true });

// Handle Touch Events for Interactive Elements Without Blocking Scrolling
document.querySelectorAll('.music-btn, .chatbot-btn, .chatbot-question, .back-to-top, .hamburger').forEach(element => {
    element.addEventListener('touchstart', () => {}, { passive: true });
    element.addEventListener('touchmove', () => {}, { passive: true });
    element.addEventListener('touchend', () => {}, { passive: true });
});

document.querySelectorAll('.fade-in-section').forEach(element => {
    element.addEventListener('touchstart', () => {}, { passive: true });
    element.addEventListener('touchmove', () => {}, { passive: true });
    element.addEventListener('touchend', () => {}, { passive: true });
});

// Stop animations when the tab is not visible to save resources
document.addEventListener('visibilitychange', () => {
    isAnimating = !document.hidden;
});