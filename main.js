document.addEventListener("DOMContentLoaded", function(){
    const items = document.getElementsByClassName("main-item");
    for (let i = 0; i < items.length; i++) {
        if (i == 0) {
            items[i].style.backgroundImage = `linear-gradient(rgba(218, 218, 218, 0.089), rgba(0, 0, 0, 0.2)), url("images/home/${i}.png")`;
            items[i].style.setProperty('--main-image', `linear-gradient(rgba(218, 218, 218, 0.089), rgba(0, 0, 0, 1)), url("images/home/${i}.png")`);
        }
        else {
            items[i].style.backgroundImage = `linear-gradient(rgba(218, 218, 218, 0.089), rgba(0, 0, 0, 0.2)), url("images/home/${i}.gif")`;
            items[i].style.setProperty('--main-image', `linear-gradient(rgba(218, 218, 218, 0.089), rgba(0, 0, 0, 1)), url("images/home/${i}.gif")`);
        }
    }

    // LOAD FOOTER
    var color_background = "rgb(27, 29, 32);";
    document.body.innerHTML += load_footer(color_background);
    MathJax();
});