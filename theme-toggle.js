// Theme Toggle Functionality
(function() {
    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.querySelector('.theme-toggle');

        if (!themeToggle) return;

        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);

            // Save preference to localStorage
            localStorage.setItem('theme', newTheme);
        });
    });
})();
