(function () {
    "use strict";

    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
        var track = carousel.querySelector(".media-carousel-track");
        var slides = Array.from(carousel.querySelectorAll(".media-carousel-slide"));
        var dotsContainer = carousel.querySelector(".media-carousel-dots");
        var previousButton = carousel.querySelector("[data-carousel-prev]");
        var nextButton = carousel.querySelector("[data-carousel-next]");
        var currentIndex = 0;
        var intervalId;
        var interval = Number.parseInt(carousel.dataset.interval, 10) || 20000;

        if (!track || slides.length < 2) {
            return;
        }

        function update(nextIndex) {
            currentIndex = (nextIndex + slides.length) % slides.length;
            track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

            if (dotsContainer) {
                dotsContainer.querySelectorAll(".media-carousel-dot").forEach(function (dot, index) {
                    var isActive = index === currentIndex;
                    dot.classList.toggle("is-active", isActive);
                    dot.setAttribute("aria-current", isActive ? "true" : "false");
                });
            }
        }

        if (dotsContainer) {
            slides.forEach(function (_, index) {
                var dot = document.createElement("button");
                dot.className = "media-carousel-dot";
                dot.type = "button";
                dot.setAttribute("aria-label", "Show image " + (index + 1));
                dot.addEventListener("click", function () {
                    update(index);
                });
                dotsContainer.appendChild(dot);
            });
        }

        if (previousButton) {
            previousButton.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                update(currentIndex - 1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                update(currentIndex + 1);
            });
        }

        function stopAutoplay() {
            window.clearInterval(intervalId);
        }

        function startAutoplay() {
            if (carousel.dataset.autoplay !== "true") {
                return;
            }

            stopAutoplay();
            intervalId = window.setInterval(function () {
                update(currentIndex + 1);
            }, interval);
        }

        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
        carousel.addEventListener("focusin", stopAutoplay);
        carousel.addEventListener("focusout", startAutoplay);

        update(0);
        startAutoplay();
    });
}());
