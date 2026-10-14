// Loaded in <head> so the saved theme applies before first paint.
(function () {
    var root = document.documentElement;
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved) root.dataset.theme = saved;

    function sync() {
        var active = root.dataset.theme || (dark.matches ? "dark" : "light");
        root.dataset.themeActive = active;
        var button = document.querySelector(".theme-toggle");
        if (button) button.setAttribute("aria-label", "Switch to " + (active === "dark" ? "light" : "dark") + " theme");
    }

    sync();
    dark.addEventListener("change", sync);
    document.addEventListener("DOMContentLoaded", sync);
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".theme-toggle")) return;
        root.dataset.theme = root.dataset.themeActive === "dark" ? "light" : "dark";
        try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
        sync();
    });
})();
