// Logo Switcher (Panda/Rabbit based on theme)
(function() {
    // All panda SVG files (excluding the default Asset 13)
    const pandas = [
        'assets/icons/header panda/Asset 1.svg',
        'assets/icons/header panda/Asset 2.svg',
        'assets/icons/header panda/Asset 3.svg',
        'assets/icons/header panda/Asset 4.svg',
        'assets/icons/header panda/Asset 5.svg',
        'assets/icons/header panda/Asset 6.svg',
        'assets/icons/header panda/Asset 7.svg',
        'assets/icons/header panda/Asset 8.svg',
        'assets/icons/header panda/Asset 9.svg',
        'assets/icons/header panda/Asset 10.svg',
        'assets/icons/header panda/Asset 11.svg',
        'assets/icons/header panda/Asset 12.svg',
        'assets/icons/header panda/Asset 14.svg'
    ];

    // Rabbit icons for dark mode
    const rabbitBase = 'assets/icons/header rabbit/rabbit 1.svg';
    const rabbitHover = 'assets/icons/header rabbit/rabbit 2.svg';
    const pandaBase = 'assets/icons/header panda/Asset 13.svg';

    // Footer icons
    const footerPanda = 'assets/icons/footer/pinkpanda.svg';
    const footerRabbit = 'assets/icons/header rabbit/rabbit footer.svg';

    // Preload all images
    const preloadedImages = [];
    [...pandas, rabbitBase, rabbitHover].forEach(src => {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });

    function updateLogos(withTransition) {
        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        const baseImg = document.querySelector('.logo-icon-base');
        const hoverImg = document.querySelector('.logo-icon-hover');
        const footerImg = document.querySelector('.footer-panda');

        if (baseImg) {
            if (withTransition) {
                // Add temporary transition, fade out, change src, fade in
                baseImg.style.transition = 'height 0.3s ease, opacity 0.15s ease';
                baseImg.style.opacity = '0';
                setTimeout(() => {
                    baseImg.src = isDark ? rabbitBase : pandaBase;
                    baseImg.style.opacity = '1';
                    // Remove opacity transition after animation completes
                    setTimeout(() => {
                        baseImg.style.transition = 'height 0.3s ease';
                    }, 150);
                }, 150);
            } else {
                // Instant change (on page load) - no opacity manipulation
                baseImg.src = isDark ? rabbitBase : pandaBase;
                baseImg.style.opacity = '1';
            }
        }

        if (hoverImg) {
            if (withTransition) {
                // Temporarily hide, then update src
                const wasHovered = hoverImg.style.opacity === '1';
                hoverImg.style.opacity = '0';
                setTimeout(() => {
                    if (!isDark) {
                        const randomPanda = pandas[Math.floor(Math.random() * pandas.length)];
                        hoverImg.src = randomPanda;
                    } else {
                        hoverImg.src = rabbitHover;
                    }
                    // Return to previous state or let CSS handle it
                    if (wasHovered) {
                        hoverImg.style.opacity = '1';
                    } else {
                        hoverImg.style.opacity = '';
                    }
                }, 150);
            } else {
                // Instant change (on page load) - just change src, let CSS handle opacity
                if (!isDark) {
                    const randomPanda = pandas[Math.floor(Math.random() * pandas.length)];
                    hoverImg.src = randomPanda;
                } else {
                    hoverImg.src = rabbitHover;
                }
                // Don't set inline opacity - let CSS handle the hover effect
            }
        }

        if (footerImg) {
            if (withTransition) {
                footerImg.style.transition = 'opacity 0.15s ease';
                footerImg.style.opacity = '0';
                setTimeout(() => {
                    footerImg.src = isDark ? footerRabbit : footerPanda;
                    footerImg.style.opacity = '1';
                    setTimeout(() => {
                        footerImg.style.transition = '';
                    }, 150);
                }, 150);
            } else {
                // Instant change (on page load)
                footerImg.src = isDark ? footerRabbit : footerPanda;
                footerImg.style.opacity = '1';
            }
        }
    }

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const logoContainer = document.querySelector('.logo-icon-container');
        const hoverImg = document.querySelector('.logo-icon-hover');

        // Set initial logos based on current theme (no transition on page load)
        updateLogos(false);

        if (!logoContainer || !hoverImg) return;

        // Update hover image on mouseenter
        logoContainer.addEventListener('mouseenter', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const isDark = theme === 'dark';

            if (!isDark) {
                // Light mode: random panda
                const randomPanda = pandas[Math.floor(Math.random() * pandas.length)];
                hoverImg.src = randomPanda;
            } else {
                // Dark mode: rabbit 2
                hoverImg.src = rabbitHover;
            }
        });

        // Listen for theme changes (use transition when theme changes)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateLogos(true);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    });
})();
