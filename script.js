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
});

function navigateToSection(sectionId) {
    // Push new state to history
    history.pushState({ sectionId }, '', `#${sectionId}`);
    showSection(sectionId);
}

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
    }
}

function goBack() {
    window.history.back();
}
