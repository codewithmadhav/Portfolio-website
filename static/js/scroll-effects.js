// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

// Configuration for Intersection Observer
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Create observer for scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Apply observer to all scroll-reveal elements
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        revealObserver.observe(section);
    });

    // Add scroll-reveal to cards
    const cards = document.querySelectorAll(
        '.skill-card, .service-card, .project-card, .about-highlights > div'
    );
    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.animationDelay = `${index * 0.1}s`;
        revealObserver.observe(card);
    });
});

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add shadow when scrolling down
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 212, 255, 0.15)';
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100px)';
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// ============================================
// PARALLAX EFFECT
// ============================================

const heroBackground = document.querySelector('.hero-background');
const heroAccent = document.querySelector('.hero-accent');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (heroBackground) {
        // Slower scroll for background elements
        heroBackground.style.transform = `translateY(calc(-50% + ${scrollY * 0.5}px))`;
    }
    
    if (heroAccent) {
        heroAccent.style.transform = `translateY(calc(${scrollY * 0.3}px))`;
    }
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Trigger counter animation when section is visible
const highlightNumbers = document.querySelectorAll('.highlight-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            highlightNumbers.forEach(element => {
                const target = parseInt(element.textContent);
                animateCounter(element, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (highlightNumbers.length > 0) {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
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

window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ELEMENT HOVER PARALLAX
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

projectCards.forEach(card => {
    card.style.transition = 'transform 0.1s ease-out';
});

// ============================================
// TYPING ANIMATION FOR HERO TEXT
// ============================================

function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
}

// Uncomment to enable typing animation on page load
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const text = heroTitle.textContent;
//         typeWriter(heroTitle, text);
//     }
// });

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// SKILL CARDS PROGRESS BARS (Optional)
// ============================================

function createProgressBar(skillCard) {
    const level = skillCard.querySelector('.skill-level').textContent;
    const levelMap = {
        'Expert': 90,
        'Advanced': 75,
        'Intermediate': 60,
        'Beginner': 40
    };

    const percentage = levelMap[level] || 50;
    const progressBar = document.createElement('div');
    progressBar.className = 'skill-progress';
    progressBar.innerHTML = `<div class="progress-fill" style="width: 0%"></div>`;

    skillCard.appendChild(progressBar);

    // Animate progress bar on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const fill = progressBar.querySelector('.progress-fill');
                    fill.style.width = percentage + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillCard);
}

// Apply progress bars to skill cards (uncomment to enable)
// document.addEventListener('DOMContentLoaded', () => {
//     const skillCards = document.querySelectorAll('.skill-card');
//     skillCards.forEach(card => createProgressBar(card));
// });

// ============================================
// MOUSE CURSOR FOLLOWER (Premium Effect)
// ============================================

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorCircle = document.createElement('div');
cursorCircle.className = 'cursor-circle';
document.body.appendChild(cursorCircle);

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let circleX = 0;
let circleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Smooth trailing effect for circle
    circleX += (mouseX - circleX) * 0.2;
    circleY += (mouseY - circleY) * 0.2;

    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';
});

// Hide cursor when leaving window
document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorCircle.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorCircle.style.opacity = '0';
});

// Scale cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('hover');
        cursorDot.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
});