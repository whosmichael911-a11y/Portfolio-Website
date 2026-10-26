// Fade the page and slide the pill before following the ordinary page link.
(function () {
    document.documentElement.classList.add("fonts-loading");

    function initialize() {
        var nav = document.querySelector(".site-nav");
        if (!nav) return;

        var fontsReady = document.fonts ? Promise.all([
            document.fonts.load('400 16px "Portfolio Sans"'),
            document.fonts.load('500 16px "Portfolio Sans"'),
            document.fonts.load('700 16px "Portfolio Sans"')
        ]).then(function () { return document.fonts.ready; }) : Promise.resolve();

        function reveal() {
            // Give the final font metrics a full layout and paint before the fade.
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    document.documentElement.classList.remove("fonts-loading");
                });
            });
        }
        fontsReady.then(reveal, reveal);

        nav.addEventListener("click", function (event) {
            var link = event.target.closest("a");
            if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("aria-current")) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            event.preventDefault();
            if (nav.dataset.switching) return;
            nav.dataset.switching = "true";
            document.body.classList.add("is-leaving");
            nav.dataset.page = link.getAttribute("href") === "info.html" ? "info" : "work";
            window.setTimeout(function () {
                window.location.assign(link.href);
            }, 450);
        });

        window.addEventListener("pageshow", function () {
            document.body.classList.remove("is-leaving");
            delete nav.dataset.switching;
            nav.dataset.page = nav.querySelector('[aria-current="page"]').getAttribute("href") === "info.html" ? "info" : "work";
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
}());
