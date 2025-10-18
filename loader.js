// Loading animation with winking panda - only shows when images are loading
(function() {
  let loaderShown = false;
  let loaderTimeout = null;
  let winkInterval = null;

  // Create loader HTML - background color will be set based on theme
  const loaderHTML = `
    <div id="site-loader" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      opacity: 0;
      transition: opacity 0.3s ease;
    ">
      <div style="text-align: center;">
        <img id="loader-icon" src="header panda/Asset 9.svg" alt="Loading..." style="
          width: 120px;
          height: 120px;
          animation: gentle-bounce 1s ease-in-out infinite;
        ">
      </div>
    </div>
    <style>
      @keyframes gentle-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    </style>
  `;

  // Show loader function
  function showLoader() {
    if (loaderShown) return;

    const loader = document.getElementById('site-loader');
    if (!loader) return;

    loaderShown = true;

    // Set background color based on current theme
    const theme = document.documentElement.getAttribute('data-theme');
    loader.style.background = theme === 'dark' ? '#0a0a0a' : '#f5f5f0';

    loader.style.display = 'flex';

    // Fade in after a brief moment
    setTimeout(function() {
      loader.style.opacity = '1';
    }, 10);

    const loaderIcon = document.getElementById('loader-icon');
    let isAnimating = false;
    let animationCount = 0; // Track animation cycles

    // Determine which icons to use based on theme
    const isDark = theme === 'dark';
    const icon1 = isDark ? 'assets/icons/header rabbit/rabbit 1.svg' : 'assets/icons/header panda/Asset 9.svg';
    const icon2 = isDark ? 'assets/icons/header rabbit/rabbit 2.svg' : 'assets/icons/header panda/Asset 8.svg';

    // Start with icon1 (normal state)
    loaderIcon.src = icon1;

    // Animation - alternate between icon1 and icon2
    // Light mode: panda wink (Asset 9 <-> Asset 8)
    // Dark mode: rabbit face change (rabbit 1 <-> rabbit 2)
    winkInterval = setInterval(function() {
      if (isAnimating) {
        loaderIcon.src = icon1;
        animationCount++; // Completed one full cycle when returning to icon1
      } else {
        loaderIcon.src = icon2;
      }
      isAnimating = !isAnimating;
    }, 400); // Animate every 400ms

    // Store animation count globally so hideLoader can check it
    window.loaderWinkCount = 0;
    const winkCountInterval = setInterval(function() {
      window.loaderWinkCount = animationCount;
    }, 100);

    // Clear the animation count interval when hiding
    window.loaderWinkCountInterval = winkCountInterval;
  }

  // Hide loader function
  function hideLoader(immediate) {
    if (!loaderShown) return;

    const loader = document.getElementById('site-loader');
    if (!loader) return;

    // If not immediate, ensure we complete at least one full animation cycle
    if (!immediate && winkInterval) {
      const loaderIcon = document.getElementById('loader-icon');
      const currentSrc = loaderIcon ? loaderIcon.src : '';

      // Determine which is the "normal" state based on theme
      const theme = document.documentElement.getAttribute('data-theme');
      const isDark = theme === 'dark';
      const normalIcon = isDark ? 'rabbit 1.svg' : 'Asset 9.svg';

      // If we haven't completed at least one animation cycle yet, wait
      const checkInterval = setInterval(function() {
        const animationCount = window.loaderWinkCount || 0;
        const isOnNormalIcon = currentSrc.includes(normalIcon) || loaderIcon.src.includes(normalIcon);

        // Wait until we've completed at least one animation cycle AND we're on the normal icon
        if (animationCount >= 1 && isOnNormalIcon) {
          clearInterval(checkInterval);
          finishHiding();
        }
      }, 100);

      // Fallback: force hide after 2 seconds
      setTimeout(function() {
        clearInterval(checkInterval);
        finishHiding();
      }, 2000);

      return;
    }

    finishHiding();

    function finishHiding() {
      if (winkInterval) {
        clearInterval(winkInterval);
        winkInterval = null;
      }

      if (window.loaderWinkCountInterval) {
        clearInterval(window.loaderWinkCountInterval);
        window.loaderWinkCountInterval = null;
      }

      loader.style.opacity = '0';

      // Remove loader from DOM after transition
      setTimeout(function() {
        if (loader && loader.parentNode) {
          loader.style.display = 'none';
          loaderShown = false;
        }
      }, 300);
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Insert loader at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    // Get all images on the page (excluding header logo and loader icon)
    const images = Array.from(document.querySelectorAll('img')).filter(function(img) {
      return !img.id || (img.id !== 'loader-icon' && !img.closest('.site-header'));
    });

    // Only proceed if there are images to load
    if (images.length === 0) {
      return; // No images, no loader needed
    }

    let loadedCount = 0;
    let loaderDelayTimeout = null;

    // Show loader only if images take more than 300ms to load
    loaderDelayTimeout = setTimeout(function() {
      if (loadedCount < images.length) {
        showLoader();
      }
    }, 300);

    // Track image loading
    function checkAllLoaded() {
      loadedCount++;

      if (loadedCount >= images.length) {
        // All images loaded
        clearTimeout(loaderDelayTimeout);
        hideLoader();
      }
    }

    // Add load listeners to all images
    images.forEach(function(img) {
      if (img.complete) {
        // Image already loaded
        checkAllLoaded();
      } else {
        // Wait for image to load
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded); // Count errors as "loaded" to avoid infinite loader
      }
    });

    // Fallback: hide loader after 10 seconds max
    setTimeout(function() {
      hideLoader();
    }, 10000);
  });
})();
