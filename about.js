// Animate timeline items when they come into view
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;
    
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        
        if (itemPosition < windowHeight - 100) {
            item.classList.add('fade-in');
        }
    });
}

// Initialize animations on load
window.addEventListener('load', animateTimeline);

// Animate on scroll
window.addEventListener('scroll', animateTimeline);

// Smooth scrolling for navigation
document.querySelectorAll('.classic-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});