// Image Lightbox functionality for project detail pages
(function() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.id = 'imageLightbox';

        // Find all images in project-images containers
        const projectImages = document.querySelectorAll('.project-images img, .project-images-grid img, .museum-app-screens img');

        if (projectImages.length === 0) return; // No images to show

        // Build lightbox HTML
        let slidesHTML = '';
        let indicatorsHTML = '';

        projectImages.forEach((img, index) => {
            const activeClass = index === 0 ? ' active' : '';
            slidesHTML += `
                <div class="lightbox-slide${activeClass}">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            indicatorsHTML += `<span class="lightbox-indicator${activeClass}" data-index="${index}"></span>`;
        });

        lightbox.innerHTML = `
            <div class="lightbox-content">
                ${slidesHTML}
                <span class="lightbox-close">&times;</span>
                ${projectImages.length > 1 ? `
                    <button class="lightbox-prev">&#10094;</button>
                    <button class="lightbox-next">&#10095;</button>
                    <div class="lightbox-indicators">${indicatorsHTML}</div>
                ` : ''}
            </div>
        `;

        document.body.appendChild(lightbox);

        let currentIndex = 0;

        // Open lightbox when clicking on an image
        projectImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentIndex = index;
                showLightboxSlide(currentIndex);
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.className === 'lightbox-content') {
                closeLightbox();
            }
        });

        // Navigation
        if (projectImages.length > 1) {
            const prevBtn = lightbox.querySelector('.lightbox-prev');
            const nextBtn = lightbox.querySelector('.lightbox-next');

            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
                showLightboxSlide(currentIndex);
            });

            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % projectImages.length;
                showLightboxSlide(currentIndex);
            });

            // Indicators
            const indicators = lightbox.querySelectorAll('.lightbox-indicator');
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function(e) {
                    e.stopPropagation();
                    currentIndex = parseInt(this.dataset.index);
                    showLightboxSlide(currentIndex);
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (lightbox.style.display !== 'block') return;

                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
                    showLightboxSlide(currentIndex);
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % projectImages.length;
                    showLightboxSlide(currentIndex);
                }
            });
        }

        function showLightboxSlide(index) {
            const slides = lightbox.querySelectorAll('.lightbox-slide');
            const indicators = lightbox.querySelectorAll('.lightbox-indicator');

            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
})();
