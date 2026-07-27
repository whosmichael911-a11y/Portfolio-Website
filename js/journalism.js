(function () {
    "use strict";

    var feature = document.querySelector("[data-journalism-feature]");
    if (!feature) {
        return;
    }

    var image = feature.querySelector("[data-story-image]");
    var tag = feature.querySelector("[data-story-tag]");
    var title = feature.querySelector("[data-story-title]");
    var description = feature.querySelector("[data-story-description]");
    var action = feature.querySelector("[data-story-action]");
    var rows = document.querySelectorAll("[data-story-target]");

    var stories = {
        ev: {
            image: "assets/US Battery Electric Vehicle Sales Until March 31st.png",
            alt: "Chart showing electric vehicle sales",
            tag: "Enterprise reporting",
            title: "EV Sales to Rise 20% by 2027",
            description: "How conflict, incentives, and consumer demand are changing the electric vehicle market.",
            action: "assets/EV_Enterprise_Han.pdf",
            actionLabel: "Download the story here",
            actionTarget: "_blank",
            actionRel: "noopener",
            bloomberg: true
        },
        "electric-slide": {
            image: "assets/sfbiztimes.jpg",
            alt: "The Electric Slide story image",
            tag: "Business reporting",
            title: "The Electric Slide",
            description: "How the canceled subsidy led to slumping sales at Bay Area dealerships, impacting consumers who desired an EV and are now considering gas-powered cars.",
            action: "assets/sfbiztimes_article.pdf",
            actionLabel: "Download the story here",
            actionTarget: "_blank",
            actionRel: "noopener",
            bloomberg: false
        },
        stakes: {
            image: "assets/oakland.jpg",
            alt: "A florist shop in Oakland",
            tag: "Local reporting",
            title: "The Stakes: Hit by import tariffs, florists try not to pass higher costs on to consumers.",
            description: "Tariffs are everywhere, and small businesses like Wisteria Rockridge are taking the toll.",
            action: "https://oaklandnorth.net/2025/12/11/the-stakes-hit-by-import-tariffs-florists-try-not-to-pass-higher-costs-on-to-consumers/",
            actionLabel: "Read it on OaklandNorth",
            actionTarget: "_blank",
            actionRel: "noopener",
            bloomberg: false
        }
    };

    rows.forEach(function (row) {
        row.addEventListener("click", function () {
            var story = stories[row.dataset.storyTarget];
            if (!story) {
                return;
            }

            image.src = story.image;
            image.alt = story.alt;
            tag.textContent = story.tag;
            title.textContent = story.title;
            description.textContent = story.description;
            action.href = story.action;
            action.target = story.actionTarget;
            action.rel = story.actionRel;
            action.classList.toggle("btn-bloomberg", story.bloomberg === true);
            action.innerHTML = story.actionLabel + ' <span aria-hidden="true">↗</span>';

            rows.forEach(function (item) {
                var isSelected = item === row;
                item.classList.toggle("is-selected", isSelected);
                item.setAttribute("aria-pressed", isSelected ? "true" : "false");
            });

            feature.classList.remove("is-changing");
            window.requestAnimationFrame(function () {
                feature.classList.add("is-changing");
            });
        });
    });
}());
