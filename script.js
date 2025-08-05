document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Hero image slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    function animateStats() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight / 2) && 
                         (rect.bottom >= window.innerHeight / 2);
        
        if (isVisible) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const suffix = stat.textContent.includes('%') ? '%' : '';
                let count = 0;
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // 60fps
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = Math.floor(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target + suffix;
                    }
                };
                
                updateCount();
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    // Only animate when stats section is in view
    window.addEventListener('scroll', animateStats);
    
    // Initialize stats animation if already in view
    animateStats();

    // Add animation to solution cards when they come into view
    const solutionCards = document.querySelectorAll('.solution-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    solutionCards.forEach((card, index) => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});
// Add these to the existing script.js

// Parallax Scroll Effect
function setupParallax() {
    const parallaxSection = document.querySelector('.parallax-showcase');
    const baseLayer = document.querySelector('.base-layer');
    const midLayer = document.querySelector('.mid-layer');
    const content = document.querySelector('.parallax-content');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const sectionOffset = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        
        if (scrollPosition > sectionOffset - window.innerHeight && 
            scrollPosition < sectionOffset + sectionHeight) {
            const progress = (scrollPosition - sectionOffset) / sectionHeight;
            
            // Parallax effect
            baseLayer.style.transform = `translateZ(-2px) scale(3) translateY(${progress * 100}px)`;
            midLayer.style.transform = `translateZ(-1px) scale(2) translateY(${progress * 50}px)`;
            
            // Content fade-in
            if (progress > 0.2 && progress < 0.8) {
                content.classList.add('animate-in');
            }
        }
    });
}

// Image Stack Animation
function setupImageStack() {
    const stackSection = document.querySelector('.image-stack-section');
    const imageStack = document.querySelector('.image-stack');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const sectionOffset = stackSection.offsetTop;
        const sectionHeight = stackSection.offsetHeight;
        
        if (scrollPosition > sectionOffset - window.innerHeight/2 && 
            scrollPosition < sectionOffset + sectionHeight) {
            const progress = (scrollPosition - sectionOffset + window.innerHeight/2) / (sectionHeight + window.innerHeight/2);
            
            // Apply animation class when in view
            if (progress > 0 && progress < 1) {
                imageStack.classList.add('stack-animate');
            } else {
                imageStack.classList.remove('stack-animate');
            }
        }
    });
}

// Initialize all animations
function initAnimations() {
    setupParallax();
    setupImageStack();
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.parallax-content, .solution-card, .tech-info, .stack-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
}

// Call initAnimations at the end of DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize new animations
    initAnimations();
});
// Add to existing script.js

function initHeroAnimations() {
    // Animate stats counter
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '';
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + suffix;
            }
        };
        
        setTimeout(updateCount, 1500);
    });
    
    // Create particles
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${size}px`;
        
        // Random animation duration (10s to 20s)
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Floating card hover effect
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            floatingCard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        floatingCard.addEventListener('mouseenter', () => {
            floatingCard.style.transition = 'none';
        });
        
        floatingCard.addEventListener('mouseleave', () => {
            floatingCard.style.transition = 'all 0.5s ease';
            floatingCard.style.transform = 'perspective(1000px) rotateY(15deg) rotateX(10deg)';
        });
    }
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    initHeroAnimations();
});

// Hero Image Gallery Functionality
function initHeroGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const pagination = document.querySelector('.gallery-pagination');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Create pagination indicators
    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('page-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.page-indicator');
    
    // Start auto-rotation
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Reset timer when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Pause on hover
    const gallery = document.querySelector('.gallery-container');
    gallery.addEventListener('mouseenter', () => clearInterval(slideInterval));
    gallery.addEventListener('mouseleave', startSlideShow);
    
    // Start the slideshow
    startSlideShow();
    
    // Animate stats counter
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '';
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + suffix;
            }
        };
        
        setTimeout(updateCount, 1500);
    });
}






// Hero Image Gallery Functionality
function initHeroGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const pagination = document.querySelector('.gallery-pagination');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Create pagination indicators
    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('page-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.page-indicator');
    
    // Start auto-rotation
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Reset timer when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Pause on hover
    const gallery = document.querySelector('.gallery-container');
    gallery.addEventListener('mouseenter', () => clearInterval(slideInterval));
    gallery.addEventListener('mouseleave', startSlideShow);
    
    // Start the slideshow
    startSlideShow();
    
    // Animate stats counter
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '';
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + suffix;
            }
        };
        
        setTimeout(updateCount, 1500);
    });
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    initHeroGallery();
});
