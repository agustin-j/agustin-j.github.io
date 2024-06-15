// LOAD CONTENTS OF THE PAGE
document.addEventListener("DOMContentLoaded", function(){

  const items = document.getElementsByClassName("simulations")[0];
  fetch('simulations/simulations.json')
  .then(response => response.json())
  .then(data => {
    // FETCH DATA FROM JSON FILE AND LOAD IT 
    let total = data.total;
    let titles = data.simulations_titles;
    let descriptions = data.simulations_description;
    let images = data.simulations_src;
    // ONLY EVEN NUMBERS OR 1 FOR DISPLAY PER PAGE
    let items_per_page = 6;
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
      if (i % 2 == 0 && i == (total - 1)) {
          let html = `<div class="row justify-content-center">
          <div class="col-lg-6 p-3 simulation${i}">
            <a onclick="loadSimulation('${i}')" style="display: inline; text-decoration: none;" href="simulation.html">
              <div class="simulation-item">
                <div class="simulation-content">
                  <div class="front-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i]}</h1>
                    </div>
                  </div>
                  <div class="back-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i]}</h1>
                      <p class="simulation-subtext">${descriptions[i]}</p>
                    </div>
                  </div>
                  <${type[i]} class="simulation-image" src="images/simulations/${images[i]}">
                </div>
              </div>
            </a>
          </div>
        </div>`;
          items.innerHTML += html;
      }
      else if (i % 2 != 0) {
          let html = `<div class="row justify-content-center">
          <div class="col-lg-6 p-3 simulation${i-1}">
            <a onclick="loadSimulation('${i-1}')" style="display: inline; text-decoration: none;" href="simulation.html">
              <div class="simulation-item">
                <div class="simulation-content">
                  <div class="front-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i-1]}</h1>
                    </div>
                  </div>
                  <div class="back-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i-1]}</h1>
                      <p class="simulation-subtext">${descriptions[i-1]}</p>
                    </div>
                  </div>
                  <${type[i-1]} class="simulation-image" src="images/simulations/${images[i-1]}">
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-6 p-3 simulation${i}">
            <a onclick="loadSimulation('${i}')" style="display: inline; text-decoration: none;" href="simulation.html">
              <div class="simulation-item">
                <div class="simulation-content">
                  <div class="front-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i]}</h1>
                    </div>
                  </div>
                  <div class="back-simulation-item">
                    <div class="simulation-item-text">
                      <h1 class="simulation-title">${titles[i]}</h1>
                      <p class="simulation-subtext">${descriptions[i]}</p>
                    </div>
                  </div>
                  <${type[i]} class="simulation-image" src="images/simulations/${images[i]}">
                </div>
              </div>
            </a>
          </div>
        </div>`;
      items.innerHTML += html;
      }
    }
    // MAKE PAGINATION
    let pagehtml = document.getElementById("pages-list");
    // ONLY EVEN NUMBERS
    let pages = Math.ceil(total/items_per_page);
    if (pages > 1 && pages < 6) {
      for (let i=0; i < pages; i++) {
        html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
        pagehtml.innerHTML += html;
      }
      show_hide_posts(1, total, pages, items_per_page);
    }
    else if (pages > 5) {
      show_hide_posts(1, total, pages, items_per_page);
    }
    // LOAD FOOTER
    var color_background = "rgba(0, 0, 0, 0.96);";
    document.body.innerHTML += load_footer(color_background);
    MathJax();
  })
  .catch(error => console.error('Error:', error));
});

// SAVE ID OF SELECTED SIMULATION
function loadSimulation(id) {
    localStorage.setItem("simulation-id", id);
}


// HIDE AND SHOW POSTS BASED ON PAGE SELECTED
function show_hide_posts(page, total, pages, items_per_page) {
  let pagination = document.getElementsByClassName('pagination')[0];
  if (pages > 5) {
    if (page == pages || page == pages - 1 || page == pages - 2) {
      let pagehtml = document.getElementById("pages-list"); 
      pagehtml.innerHTML = ``;
      let html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
      <li class="page-item simulation-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
      pagehtml.innerHTML += html;
      for (let i = pages - 4; i < pages; i++) {
        html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
        pagehtml.innerHTML += html;
      }
    }
    else if (page == 1 || page == 2 || page == 3) {
      let pagehtml = document.getElementById("pages-list");
      pagehtml.innerHTML = ``;
      for (let i=0; i < 4; i++) {
        html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
        pagehtml.innerHTML += html;
      }
      html = `<li class="page-item simulation-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
      <li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
      pagehtml.innerHTML += html;
    }
    else {
      let pagehtml = document.getElementById("pages-list");
      pagehtml.innerHTML = ``;
      let html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
      <li class="page-item simulation-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
      pagehtml.innerHTML += html;
      for (let i = page - 1; i < page + 2; i++) {
        html = `<li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${i},${total}, ${pages}, ${items_per_page})" href="#">${i}</a></li>`;
        pagehtml.innerHTML += html;
      }
      html = `<li class="page-item simulation-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
      <li class="page-item"><a class="simulation-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
      pagehtml.innerHTML += html;
    }
    for (let i = 0; i < 6; i++) {
      if (pagination.children[i].children[0].text == page) {
        pagination.children[i].children[0].classList.add('simulation-pagination-active');
      }
      else {
        if (pagination.children[i].children[0].classList.contains('simulation-pagination-active') == true) {
          pagination.children[i].children[0].classList.remove('simulation-pagination-active'); 
        }
      }
    } 
    for (let i = 0; i < total; i++) {
      if ((page-1)*items_per_page <= i && i < page*items_per_page) {
        document.getElementsByClassName(`simulation${i}`)[0].style.display = "block";
      }
      else {
        document.getElementsByClassName(`simulation${i}`)[0].style.display = "none";
      }
    }
  }
  else {
    for (let i = 0; i < pages; i++) {
      if (i == page - 1) {
        pagination.children[i].children[0].classList.add('simulation-pagination-active');
      }
      else {
        if (pagination.children[i].children[0].classList.contains('simulation-pagination-active') == true) {
          pagination.children[i].children[0].classList.remove('simulation-pagination-active'); 
        }
      }
    } 
    for (let i = 0; i < total; i++) {
      if ((page-1)*items_per_page <= i && i < page*items_per_page) {
        document.getElementsByClassName(`simulation${i}`)[0].style.display = "block";
      }
      else {
        document.getElementsByClassName(`simulation${i}`)[0].style.display = "none";
      }
    }
  }
}