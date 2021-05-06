const video = document.querySelector(".video-proof")

window.addEventListener("resize", function () {
    const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    if (viewPortWidth < 2560) {
        video.removeAttribute("poster");
        video.setAttribute("poster", "./imgs/proof/poster1.jpg");
    }
})