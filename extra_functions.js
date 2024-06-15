// LOAD FOOTER
function load_footer(color_background) {
    var current_year = new Date().getFullYear()
    var footer = 
    String.raw`<footer class="container-fluid p-3" style="background-color: ${color_background}">
        <div class="row">
        <div class="col-lg-3">
            <div class="d-flex justify-content-center">
            <a style="width: 20rem;" href="https://en.wikipedia.org/wiki/Lorenz_system" target="_blank"><img class="w-100" src="images/lorenz-footer.gif" alt="Lorentz"/></a>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="p-3">
            <h2 class="footer-title">LORENZ</h2>
            <p class="text-muted" style="font-family: 'Roboto', sans-serif; text-align: justify;">A Lorenz attractor is described by the chaotic solutions of the following set of ordinary differential
                equations:</p>
            <p class="text-muted text-start">$$
                \begin{align}
                \frac{\mathrm{d} x}{\mathrm{d} t} & = \sigma (y-x) ,\quad  \sigma = 10\\
                \frac{\mathrm{d} y}{\mathrm{d} t} & = x (\rho - z) - y ,\quad \rho = 28\\
                \frac{\mathrm{d} z}{\mathrm{d} t} & = xy - \beta z ,\quad \beta = \frac{8}{3}
                \end{align}$$
            </p>
            </div>
        </div>
        <div class="col-lg-2">
            <div class="p-3">
            <h2 class="footer-title">LINKS</h2>
            <div style="font-family: 'Roboto', sans-serif;">
                <a class="footer-link" href="main.html">Home</a><br>
                <a class="footer-link" href="renders.html">Renders</a><br>
                <a class="footer-link" href="simulations.html">Simulations</a><br>
                <a class="footer-link" href="projects.html">Projects</a><br>
            </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="p-3">
            <h2 class="footer-title">ABOUT ME</h2>
            <div style="font-family: 'Roboto', sans-serif;">
                <p class="text-muted" style="text-align: justify;">I'm currently studying mechanical engineering as well as electronic engineering,
                but I'm mainly focusing on mechanical. I enjoy programming simulations and graphing stuff that looks good. I try to learn about everything.</p>
                <div class="text-end">
                <p class="figure-caption text-light">&#169; Agustín J, ${current_year} &#160;<img src="images/ar.svg" width="10" alt="Argentina"/></p>
                <a class="icon fa-brands fa-github fa-2x mx-1" href="https://github.com/agustin-j" target="_blank"></a>
                <a class="icon fa-brands fa-linkedin fa-2x" href="https://www.linkedin.com/in/agust%C3%ADn-jarzyna/" target="_blank"></a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </footer>`;
    return footer
}

// LOAD MATHJAX
function MathJax() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.id = "MathJax-script";
    document.getElementsByTagName("head")[0].appendChild(script);
}