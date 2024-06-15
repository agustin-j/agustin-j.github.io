// LOAD CONTENTS OF THE PAGE
document.addEventListener("DOMContentLoaded", function(){
    const items = document.getElementsByClassName("projects")[0];
    fetch('projects/projects.json')
    .then(response => response.json())
    .then(data => {
        // FETCH DATA FROM JSON FILE AND LOAD IT 
        let total = data.total;
        let dates = data.projects_dates;
        let titles = data.projects_titles;
        let descriptions = data.projects_description;
        let images = data.projects_src;
        // SELECT HOW MANY ITEMS TO SHOW PER PAGE
        let items_per_page = 5;
        var type = [];
        for (let i = 0; i < total; i++) {
            if (images[i].split(".")[1] == "mp4" || images[i].split(".")[1] == "mov") {
                type.push("video autoplay muted loop");
            }
            else {
                type.push("img");
            }
        }
        for (let i = 0; i < total; i++) {
            html = `
            <div class="row project${i}">
                <div class="col-lg-7 align-self-center">
                    <div class="p-3">
                        <p class="project-date m-0 mx-1"><small>${dates[i]}</small></p>
                        <h1 class="project-title">${titles[i]}</h1>
                        <p class="project-subtext">${descriptions[i]}</p>
                        <a onclick="loadProject('${i}')" class="project-link" href="project.html" role="button">Read more<i class="fa-solid fa-arrow-right project-icon"></i></a>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="project-item">
                        <${type[i]} class="project-image" src="images/projects/${images[i]}">
                    </div>
                </div>
            </div>
            `;
            items.innerHTML += html;
            if ((i + 1) % items_per_page != 0 && i != total - 1) {
                items.innerHTML += `<hr class="separator project${i}">`;
            }
        }
        // MAKE PAGINATION
        let pagehtml = document.getElementById("pages-list");
        let pages = Math.ceil(total/items_per_page);
        if (pages > 1 && pages < 6) {
            for (let i=0; i < pages; i++) {
                html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
                pagehtml.innerHTML += html;
            }
            show_hide_posts(1, total, pages, items_per_page);
        }
        else if (pages > 5) {
            for (let i=0; i < 4; i++) {
                html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
                pagehtml.innerHTML += html;
            }
            html = `<li class="page-item project-pagination">...</a></li>
            <li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${pages},${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
            pagehtml.innerHTML += html;
            show_hide_posts(1, total, pages, items_per_page);
        }
        // LOAD FOOTER
        var color_background = "rgb(27, 29, 32);";
        document.body.innerHTML += load_footer(color_background);
        MathJax();
    })
    .catch(error => console.error('Error:', error));
});

// SAVE ID OF SELECTED PROJECT
function loadProject(id) {
    localStorage.setItem("project-id", id);
}

// HIDE AND SHOW POSTS BASED ON PAGE SELECTED
function show_hide_posts(page, total, pages, items_per_page) {
    let pagination = document.getElementsByClassName('pagination')[0];
    if (pages > 5) {
        if (page == pages || page == pages - 1 || page == pages - 2) {
            let pagehtml = document.getElementById("pages-list"); 
            pagehtml.innerHTML = ``;
            let html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
            <li class="page-item project-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
            pagehtml.innerHTML += html;
            for (let i = pages - 4; i < pages; i++) {
                html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
                pagehtml.innerHTML += html;
            }
        }
        else if (page == 1 || page == 2 || page == 3) {
            let pagehtml = document.getElementById("pages-list");
            pagehtml.innerHTML = ``;
            for (let i= 0; i < 4; i++) {
                html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
                pagehtml.innerHTML += html;
            }
            html = `<li class="page-item project-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
            <li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
            pagehtml.innerHTML += html;
        }
        else {
            let pagehtml = document.getElementById("pages-list");
            pagehtml.innerHTML = ``;
            let html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
            <li class="page-item project-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
            pagehtml.innerHTML += html;
            for (let i = page - 1; i < page + 2; i++) {
                html = `<li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${i},${total}, ${pages}, ${items_per_page})" href="#">${i}</a></li>`;
                pagehtml.innerHTML += html;
            }
            html = `<li class="page-item project-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
            <li class="page-item"><a class="project-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
            pagehtml.innerHTML += html;
        }
        for (let i = 0; i < 6; i++) {
            if (pagination.children[i].children[0].text == page) {
                pagination.children[i].children[0].classList.add('project-pagination-active');
            }
            else {
                if (pagination.children[i].children[0].classList.contains('project-pagination-active') == true) {
                pagination.children[i].children[0].classList.remove('project-pagination-active'); 
                }
            }
        } 
        for (let i = 0; i < total; i++) {
            if ((page-1)*items_per_page <= i && i < page*items_per_page) {
                let item = document.getElementsByClassName(`project${i}`)
                if (item.length == 1) {
                    item[0].style.display = "flex";
                }
                else {
                    item[0].style.display = "flex";
                    item[1].style.display = "block";
                } 
            }
            else {
                let item = document.getElementsByClassName(`project${i}`)
                if (item.length == 1) {
                    item[0].style.display = "none";
                }
                else {
                    item[0].style.display = "none";
                    item[1].style.display = "none";
                } 
            }
        }
    }
    else {
        for (let i = 0; i < pages; i++) {
            if (i == page - 1) {
                pagination.children[i].children[0].classList.add('project-pagination-active');
            }
            else {
                if (pagination.children[i].children[0].classList.contains('project-pagination-active') == true) {
                    pagination.children[i].children[0].classList.remove('project-pagination-active'); 
                }
            }
            } 
            for (let i = 0; i < total; i++) {
            if ((page-1)*items_per_page <= i && i < page*items_per_page) {
                let item = document.getElementsByClassName(`project${i}`)
                if (item.length == 1) {
                    item[0].style.display = "flex";
                }
                else {
                    item[0].style.display = "flex";
                    item[1].style.display = "block";
                } 
            }
            else {
                let item = document.getElementsByClassName(`project${i}`)
                if (item.length == 1) {
                    item[0].style.display = "none";
                }
                else {
                    item[0].style.display = "none";
                    item[1].style.display = "none";
                } 
            }
        }
    }
}