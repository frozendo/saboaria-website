// Header bar scroll functionality
window.addEventListener('scroll', function() {
    const headerBar = document.getElementById('header');
    const banner = document.querySelector('.banner');

    if (banner) {
        const bannerBottom = banner.offsetTop + banner.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const minHeaderHeight = bannerBottom - 300;
        
        // Show header when banner is no longer visible
        if (scrollPosition > minHeaderHeight) {
            headerBar.classList.add('show');
        } else {
            headerBar.classList.remove('show');
        }
    }
});


// Carousel products
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.getElementById('btn-product-prev');
    const nextBtn = document.getElementById('btn-product-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const productCards = document.querySelectorAll('.carousel-card.product-card');

    let currentSlide = 0;
    let totalSlides = indicators.length;

    // Update carousel position
    function updateProductsCarousel() {
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
            var productCard = productCards[index];
            if (productCard.dataset.productIndex === currentSlide.toString()) {
                productCard.classList.add('active');
            } else {
                productCard.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === indicators.length - 1;
    }

    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateProductsCarousel();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateProductsCarousel();
        }
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateProductsCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    });

    // Initialize carousel
    updateProductsCarousel();
});


// Carousel customers
document.addEventListener('DOMContentLoaded', function() {
    const customerCards = document.querySelectorAll('.carousel-card-text.customer-card');
    let shouldRunCarousel = true;

    let currentSlide = 0;

    // Update carousel position
    function updateCustomersCarousel() {     
        customerCards.forEach((customerCard, index) => {
            if (index === currentSlide) {
                customerCard.classList.add('active');
            } else {
                customerCard.classList.remove('active');
            }
        });
    }

    function automaticUpdateCarousel() {
        if (shouldRunCarousel) {
            currentSlide++;
            if (currentSlide >= customerCards.length) {
                currentSlide = 0;
            }
            updateCustomersCarousel();
        }
    }

    function stopAutomaticSlide() {
        shouldRunCarousel = false;
    }

    function startAutomaticSlide() {
        shouldRunCarousel = true;
    }

    customerCards.forEach((customerCard, index) => {
        customerCard.addEventListener('mouseover', () => stopAutomaticSlide());
    });

    customerCards.forEach((customerCard, index) => {
        customerCard.addEventListener('mouseout', () => startAutomaticSlide());
    });

    customerCards.forEach((customerCard, index) => {
        customerCard.addEventListener('touchstart', () => stopAutomaticSlide());
    });

    customerCards.forEach((customerCard, index) => {
        customerCard.addEventListener('touchend', () => startAutomaticSlide());
    });
    
    setInterval(automaticUpdateCarousel, 5000);
});