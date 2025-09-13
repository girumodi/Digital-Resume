// Resume Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeResume();
});

function initializeResume() {
    // Add animations and interactions
    addScrollAnimations();
    addHoverEffects();
    addKeyboardSupport();
    addContactLinkHandlers();
    animateProgressBars();
    addPrintOptimization();

    console.log('🚀 Girish Teli Resume initialized successfully!');
}

// Scroll animations for sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add stagger delay for multiple elements
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .section,
        .summary-content,
        .job-item,
        .project-card,
        .education-item,
        .achievement-item,
        .cert-item,
        .lang-item
    `);

    animatableElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';

        observer.observe(element);
    });
}

// Enhanced hover effects
function addHoverEffects() {
    // Skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
        });
    });

    // Interest tags interaction
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
        });
    });
}

// Print optimization
function addPrintOptimization() {
    const printBtn = document.querySelector('.print-btn');

    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '🖨️ Preparing...';
            this.disabled = true;

            setTimeout(() => {
                window.print();

                // Reset after print
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
            }, 300);
        });
    }
}

// Contact link handlers
function addContactLinkHandlers() {
    const contactLinks = document.querySelectorAll('.contact-item a');

    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Visual feedback
            this.parentElement.style.background = 'rgba(79, 172, 254, 0.3)';

            setTimeout(() => {
                this.parentElement.style.background = 'rgba(255,255,255,0.15)';
            }, 200);
        });
    });
}

// Keyboard navigation support
function addKeyboardSupport() {
    const focusableElements = document.querySelectorAll('a[href], button');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4facfe';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Animate progress bars for languages
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.proficiency-fill');

    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;

                // Reset and animate
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s ease-in-out';

                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);

                observer.unobserve(progressBar);
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Dynamic year update for footer
function updateFooterYear() {
    const footer = document.querySelector('.resume-footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `© ${currentYear} Girish Teli - Software Test Engineer`;
    }
}

// Initialize footer year
updateFooterYear();