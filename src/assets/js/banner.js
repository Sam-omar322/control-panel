const closeBanners = document.querySelectorAll(".js-banner__close");
closeBanners.forEach( closeBanner => {
    closeBanner.addEventListener("click", function(event) {
        const banner = event.target.parentNode;
        banner.classList.add("collapse");

        // delete element after transition end
        banner.addEventListener("transitionend", function(event) {
            if (event.target === this) {
            this.remove();
            }
        })
    })
})