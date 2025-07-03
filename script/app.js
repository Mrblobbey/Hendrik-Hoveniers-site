$(document).ready(function () {
    function initCarousel(carouselSelector) {
        var $carousel = $(carouselSelector);
        var $items = $carousel.find('li.items');
        var itemCount = $items.length;
        var current = 0;
        var autoSwap;

        function updatePositions() {
            $items.removeClass('main-pos left-pos right-pos back-pos');
            $items.each(function (i) {
                var pos = (i - current + itemCount) % itemCount;
                if (pos === 0) {
                    $(this).addClass('main-pos');
                } else if (pos === 1) {
                    $(this).addClass('right-pos');
                } else if (pos === itemCount - 1) {
                    $(this).addClass('left-pos');
                } else {
                    $(this).addClass('back-pos');
                }
            });
        }

        function swap(direction) {
            if (direction === 'counter-clockwise') {
                current = (current - 1 + itemCount) % itemCount;
            } else {
                current = (current + 1) % itemCount;
            }
            updatePositions();
        }

        // Auto swap
        function startAutoSwap() {
            autoSwap = setInterval(function () { swap('clockwise'); }, 3500);
        }
        function stopAutoSwap() {
            clearInterval(autoSwap);
        }

        // Init
        updatePositions();
        startAutoSwap();

        // Pause on hover
        $carousel.on('mouseenter', stopAutoSwap);
        $carousel.on('mouseleave', startAutoSwap);

        // Click to rotate
        $items.on('click', function () {
            if ($(this).hasClass('left-pos')) {
                swap('counter-clockwise');
            } else if ($(this).hasClass('right-pos')) {
                swap('clockwise');
            }
        });

        // Touch swipe for mobile
        let touchStartX = null;
        $carousel.on('touchstart', function (e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });
        $carousel.on('touchend', function (e) {
            if (touchStartX === null) return;
            let touchEndX = e.originalEvent.changedTouches[0].clientX;
            if (touchEndX - touchStartX > 50) {
                swap('counter-clockwise');
            } else if (touchStartX - touchEndX > 50) {
                swap('clockwise');
            }
            touchStartX = null;
        });
    }

    // Init both carousels
    initCarousel('#photos .carousel');
    initCarousel('#reviews-carousel .carousel');

    // Contactformulier handler
    function openGmail(event) {
        event.preventDefault(); // voorkomt standaard formulierverzending

        const naam = document.getElementById("naam").value;
        const email = document.getElementById("email").value;
        const postcode = document.getElementById("postcode").value;
        const bericht = document.getElementById("bericht").value;

        const ontvanger = "hendrikhogendijkhovenier@gmail.com";
        const onderwerp = encodeURIComponent("Nieuw bericht van contactformulier");
        const body = encodeURIComponent(
            `Naam: ${naam}\nE-mail: ${email}\nPostcode: ${postcode}\n\nBericht:\n${bericht}`
        );

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${ontvanger}&su=${onderwerp}&body=${body}`;

        window.open(gmailUrl, '_blank'); // opent Gmail in een nieuw tabblad
    }

    document.getElementById("offerte-form").addEventListener("submit", openGmail);
});
