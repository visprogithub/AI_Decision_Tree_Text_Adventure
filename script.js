// Smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let lastActiveSection = null;

document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    history.replaceState({ sectionId: 'start' }, '', '#start');
    showSection('start');

    // Handle clicks on navigation buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            navigateToSection(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.sectionId) {
            showSection(event.state.sectionId);
        }
    });

    // Add click handlers for navigation buttons
    document.querySelector('.home-button')?.addEventListener('click', goHome);
    document.querySelector('.back-button')?.addEventListener('click', goBack);
});

function navigateToSection(sectionId) {
    // Push new state to history
    history.pushState({ sectionId }, '', `#${sectionId}`);
    showSection(sectionId);
}

// Update showSection to handle navigation button visibility
function showSection(sectionId) {
    // Hide previous active section
    if (lastActiveSection) {
        lastActiveSection.classList.remove('active');
    }

    // Show new section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        lastActiveSection = targetSection;
        
        // Show/hide back button based on section
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.style.display = sectionId === 'start' ? 'none' : 'flex';
        }
        
        // Update document title
        document.title = `AI Implementation - ${targetSection.querySelector('h2').textContent}`;
    }
}

function goBack() {
    window.history.back();
}

function goHome() {
    // Clear history state and navigate to start
    history.pushState({ sectionId: 'start' }, '', '#start');
    showSection('start');
}
