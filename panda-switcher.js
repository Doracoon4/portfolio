// Panda Logo Switcher
(function() {
    // All panda SVG files (excluding the default Asset 13)
    const pandas = [
        'header panda/Asset 1.svg',
        'header panda/Asset 2.svg',
        'header panda/Asset 3.svg',
        'header panda/Asset 4.svg',
        'header panda/Asset 5.svg',
        'header panda/Asset 6.svg',
        'header panda/Asset 7.svg',
        'header panda/Asset 8.svg',
        'header panda/Asset 9.svg',
        'header panda/Asset 10.svg',
        'header panda/Asset 11.svg',
        'header panda/Asset 12.svg',
        'header panda/Asset 14.svg'
    ];

    // Preload all panda images
    const preloadedImages = [];
    pandas.forEach(src => {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const logoContainer = document.querySelector('.logo-icon-container');
        const hoverImg = document.querySelector('.logo-icon-hover');

        if (!logoContainer || !hoverImg) return;

        logoContainer.addEventListener('mouseenter', function() {
            // Pick a random panda (different from Asset 13)
            const randomPanda = pandas[Math.floor(Math.random() * pandas.length)];
            hoverImg.src = randomPanda;
        });
    });
})();
