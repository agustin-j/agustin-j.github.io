document.addEventListener("DOMContentLoaded", function(){
  
    // USE STORED ID TO LOOK UP project
    let id = localStorage.getItem("project-id");
    if (id == null) {
      id = 0;
    }
    fetch('projects/projects.json')
    .then(response => response.json())
    .then(data_0 => {
        let amount_of_projects = data_0.total;
        let title = data_0.projects_titles[id];
        let file = data_0.projects_files[id];
        let date = data_0.projects_dates[id];
        let formated_date = Format_date(date)
        document.title = title;
        
        // OBTAIN MARKDOWN TO TRANSFORM IN HTML
        fetch(`projects/markdown/${file}`)
        .then(response => response.text())
        .then(data => {
          var converter = new showdown.Converter();
          let content = data.split('---')[2];
          html = converter.makeHtml(content);

          // LOOK FOR MP4 FILES
          let mp4 = html.split('.mp4');
          let mp4_replaced = [];

          // REPLACE IMG FOR MP4
          for (i = 1; i < mp4.length; i++) {
            if (mp4[i].substr(0, 17) == `" alt="0-control"`) {
              let substrings = mp4[i - 1].split("<");
              let replace = substrings[substrings.length - 1].substr(3);
              substrings.pop();
              let text = substrings.join("<");
              text = `${text}<div class="mt-4 mb-4"><video class="img-fluid" controls ${replace}.mp4`; 
              mp4_replaced.push(text);
            }
            else if (mp4[i].substr(0, 17) == `" alt="1-control"`) {
              let substrings = mp4[i - 1].split("<");
              let replace = substrings[substrings.length - 1].substr(3);
              substrings.pop();
              let text = substrings.join("<");
              text = `${text}<div class="mt-4 mb-4"><video class="img-fluid" autoplay loop muted ${replace}.mp4`; 
              mp4_replaced.push(text);
            }
          }
          mp4_replaced.push(mp4[mp4.length - 1]);
          html = mp4_replaced.join("");
          
          // ADD MISSING VIDEO TAGS
          mp4 = html.split(".mp4");
          mp4_replaced = [mp4[0]];
          for (i = 1; i < mp4.length; i++) {
            let text = `.mp4${mp4[i].substr(0, 17)}></video></div>${mp4[i].substr(20)}`;   
            mp4_replaced.push(text);
          }
          html = mp4_replaced.join("");

          var main_div = document.getElementById("project");
          main_div.innerHTML += `<p class="project-date text-center" style="color:grey">${formated_date}</p>
          <h1 class="project-header text-center">${title}</h1>`;
          main_div.innerHTML += `<div class="project-text">${html}</div>`;

          // STYLE OF ELEMENTS OF MARKDOWN
          let titles = main_div.getElementsByTagName("h2");
          let paragraphs = main_div.getElementsByTagName("p");
          let math_div = main_div.getElementsByClassName("math-div");
          let code = main_div.getElementsByTagName("pre");
          let images = main_div.getElementsByTagName("img");
          for (let i = 0; i < titles.length; i++) {
            titles[i].classList.add("project-titles");
          }
          for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].classList.add("project-paragraphs");
          }
          for (let i = 0; i < math_div.length; i++) {
            math_div[i].style.overflow = "auto";
            math_div[i].style.overflowY = "hidden";
            math_div[i].classList.add("project-paragraphs", "p-2", "px-5", "scroller-project")
          }
          for (let i = 0; i < code.length; i++) {
            code[i].children[0].classList.add("scroller-code")
            code[i].classList.add("theme-github-dark", "project-code");
          }
          for (let i = 0; i < images.length; i++) {
            old = images[i]
            var parent = images[i].parentElement;
            var wrapper = document.createElement("div");
            parent.replaceChild(wrapper, images[i]);
            wrapper.appendChild(old);
            images[i].classList.add("project-images", "py-2");
            images[i].style.width = "100%";
            wrapper.classList.add("text-center");
          }
          
          // CREATE BUTTONS OF NEXT AND BACK
          let buttons = document.createElement("div");
          id = parseInt(id)
          if (amount_of_projects > 1) {
            if (id == 0) {
              let next = `<div>
              <a onclick="loadProject('${id + 1}')" class="go-back go-back-dark next" style="font-weight: 500; font-family: 'Roboto Mono', monospace" href="project.html" role="button">Next Project: ${data_0.projects_titles[id + 1]}<i class="fa-solid fa-play fa-sm" style="margin-left:0.5rem"></i></a>
              </div>`
              buttons.classList.add("d-flex", "justify-content-end")
              buttons.innerHTML += next
            }
            else if (id == data_0.total - 1) {
              let back = `<div>
              <a onclick="loadProject('${id - 1}')" class="go-back go-back-dark previous" style="font-weight: 500; font-family: 'Roboto Mono', monospace" href="project.html" role="button"><i class="fa-solid fa-play fa-sm" style="transform:rotate(180deg); margin-right:0.5rem"></i>Previous Project: ${data_0.projects_titles[id - 1]}</a>
              </div>`
              buttons.classList.add("d-flex", "justify-content-start")
              buttons.innerHTML += back
            }
            else {
              let both = `<div>
              <a onclick="loadProject('${id - 1}')" class="go-back go-back-dark previous" style="font-weight: 500; font-family: 'Roboto Mono', monospace" href="project.html" role="button">
              <i class="fa-solid fa-play fa-sm" style="transform:rotate(180deg); margin-right:0.5rem"></i>Previous Project<span class="previous-text">: ${data_0.projects_titles[id - 1]}</span></a>
              </div>
              <div>
              <a onclick="loadProject('${id + 1}')" class="go-back go-back-dark next" style="font-weight: 500; font-family: 'Roboto Mono', monospace" href="project.html" role="button">
              Next Project<span class="next-text">: ${data_0.projects_titles[id + 1]}</span><i class="fa-solid fa-play fa-sm" style="margin-left:0.5rem"></i></a>
              </div>`
              buttons.classList.add("d-flex", "justify-content-between")
              buttons.innerHTML += both
            }
          }
          main_div.parentElement.appendChild(buttons)

          // LOAD FOOTER
          var color_background = "rgba(0, 0, 0, 0.95);";
          document.body.innerHTML += load_footer(color_background);
          MathJax();
          
          // HIGHLIGHT CODE
          hljs.highlightAll();
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
});

// FORMAT DATE OF SELECTED PROJECT
function Format_date(date) {
  let content = date.split("/");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day = content[0];
  let month = months[content[1]];
  let year = content[2];
  let formated_date =  `${month} ${day}, ${year}`;
  return formated_date
}

// SAVE ID OF SELECTED PROJECT
function loadProject(id) {
  localStorage.setItem("project-id", id);
}