// LOAD CONTENTS OF THE PAGE
document.addEventListener("DOMContentLoaded", function(){

  const items = document.getElementsByClassName("renders")[0];
  fetch('renders/renders.json')
  .then(response => response.json())
  .then(data => {
      // FETCH DATA FROM JSON FILE AND LOAD IT  
      let total = data.total;
      let images = data.renders;
      // EVEN NUMBER ONLY OR 1 FOR DISPLAY PER PAGE
      let items_per_page = 10;
      var titles = [];
      var type = [];
      for (let i = 0; i < total; i++) {
          titles.push(images[i].split(".")[0]);
          if (images[i].split(".")[1] == "mp4" || images[i].split(".")[1] == "mov") {
            type.push("video autoplay loop muted");
          }
          else {
            type.push("img");
          }
      }
      for (let i = 0; i < total; i++) {
          if (i % 2 == 0 && i == (total - 1)) {
              let html = `<div class="row justify-content-center">
              <div class="col-lg-6 p-3 render${i}">
                <div onclick="LoadModal('${images[i]}', '${titles[i]}', '${type[i]}')" class="render-item">
                  <${type[i]} class="render-image" src="images/renders/${images[i]}">
                </div>
              </div>
            </div>`;
              items.innerHTML += html;
          }
          else if (i % 2 != 0) {
              let html = `<div class="row justify-content-center">
              <div class="col-lg-6 p-3 render${i-1}">
                <div onclick="LoadModal('${images[i-1]}', '${titles[i-1]}', '${type[i-1]}')" class="render-item">
                  <${type[i-1]} class="render-image" src="images/renders/${images[i-1]}">
                </div>
              </div>
              <div class="col-lg-6 p-3 render${i}">
                <div onclick="LoadModal('${images[i]}', '${titles[i]}', '${type[i]}')" class="render-item">
                  <${type[i]} class="render-image" src="images/renders/${images[i]}">
                </div>
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
          html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page}, ${items_per_page})" href="#">${i+1}</a></li>`;
          pagehtml.innerHTML += html;
        }
        show_hide_posts(1, total, pages, items_per_page);
      }
      else if (pages > 5) {
        show_hide_posts(1, total, pages, items_per_page);
      }
      
      // LOAD FOOTER
      var color_background = "rgb(0, 0, 0);";
      document.body.innerHTML += load_footer(color_background);
      MathJax();

      // HIDE MODAL AND PLAY VIDEOS
      var modal = document.getElementById('render-image');
      modal.addEventListener('hidden.bs.modal', function (event) {
        var item = document.getElementById("render-image-src").children[0];
        if (item.tagName.toUpperCase() == "VIDEO") {
          item.pause();
        }
        var paused = document.getElementsByClassName("render-image");
        let total = paused.length;
        for (let i = 0; i < total; i++) {
          if (paused[i].tagName.toUpperCase() == "VIDEO") {
            paused[i].load();
          } 
        }});
  }).catch(error => console.error('Error:', error));
});

// SHOW MODAL
function LoadModal(image, title, type) {
    document.getElementById("render-image-title").textContent = title;
    if (type != "img") {
      document.getElementById("render-image-src").innerHTML = `<video controls src="images/renders/${image}" style="width: 100%;"></video>`;
    }
    else {
      document.getElementById("render-image-src").innerHTML = `<img src="images/renders/${image}" style="width: 100%;">`;
    }
    var myModal = new bootstrap.Modal(document.getElementById('render-image'));
    myModal.toggle();

    // PAUSE VIDEOS
    var playing = document.getElementsByClassName("render-image");
    let total = playing.length;
    for (let i = 0; i < total; i++) {
      if (playing[i].tagName.toUpperCase() == "VIDEO") {
        playing[i].pause();
      } 
    }
}

// HIDE AND SHOW POSTS BASED ON PAGE SELECTED
function show_hide_posts(page, total, pages, items_per_page) {
  let pagination = document.getElementsByClassName('pagination')[0];
  if (pages > 5) {
    if (page == pages || page == pages - 1 || page == pages - 2) {
      let pagehtml = document.getElementById("pages-list"); 
      pagehtml.innerHTML = ``;
      let html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
      <li class="page-item render-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
      pagehtml.innerHTML += html;
      for (let i = pages - 4; i < pages; i++) {
        html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
        pagehtml.innerHTML += html;
      }
    }
    else if (page == 1 || page == 2 || page == 3) {
      let pagehtml = document.getElementById("pages-list");
      pagehtml.innerHTML = ``;
      for (let i= 0; i < 4; i++) {
        html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${i+1},${total}, ${pages}, ${items_per_page})" href="#">${i+1}</a></li>`;
        pagehtml.innerHTML += html;
      }
      html = `<li class="page-item render-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
      <li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
      pagehtml.innerHTML += html;
    }
    else {
      let pagehtml = document.getElementById("pages-list");
      pagehtml.innerHTML = ``;
      let html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${1},${total}, ${pages}, ${items_per_page})" href="#">${1}</a></li>
      <li class="page-item render-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>`;
      pagehtml.innerHTML += html;
      for (let i = page - 1; i < page + 2; i++) {
        html = `<li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${i},${total}, ${pages}, ${items_per_page})" href="#">${i}</a></li>`;
        pagehtml.innerHTML += html;
      }
      html = `<li class="page-item render-pagination-extra"><i class="fa-solid fa-ellipsis"></i></li>
      <li class="page-item"><a class="render-pagination" onclick="show_hide_posts(${pages}, ${total}, ${pages}, ${items_per_page})" href="#">${pages}</a></li>`;
      pagehtml.innerHTML += html;
    }
    for (let i = 0; i < 6; i++) {
      if (pagination.children[i].children[0].text == page) {
        pagination.children[i].children[0].classList.add('render-pagination-active');
      }
      else {
        if (pagination.children[i].children[0].classList.contains('render-pagination-active') == true) {
          pagination.children[i].children[0].classList.remove('render-pagination-active'); 
        }
      }
    } 
    for (let i = 0; i < total; i++) {
      if ((page-1)*items_per_page <= i && i < page*items_per_page) {
        document.getElementsByClassName(`render${i}`)[0].style.display = "block";
      }
      else {
        document.getElementsByClassName(`render${i}`)[0].style.display = "none";
      }
    }
  }
  else {
    for (let i = 0; i < pages; i++) {
      if (i == page - 1) {
        pagination.children[i].children[0].classList.add('render-pagination-active');
      }
      else {
        if (pagination.children[i].children[0].classList.contains('render-pagination-active') == true) {
          pagination.children[i].children[0].classList.remove('render-pagination-active'); 
        }
      }
    } 
    for (let i = 0; i < total; i++) {
      if ((page-1)*items_per_page <= i && i < page*items_per_page) {
        document.getElementsByClassName(`render${i}`)[0].style.display = "block";
      }
      else {
        document.getElementsByClassName(`render${i}`)[0].style.display = "none";
      }
    }
  }
}