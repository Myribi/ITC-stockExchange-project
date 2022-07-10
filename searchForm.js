class SearchForm {
  constructor(form) {
    this.form = form;
    this.createHtml();
    let cont = document.getElementById("cont")
  }

  async onSearch(callback) {
    this.callback = callback
    let searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", (e) => {
      this.list();
   });
  }


  async list() {
    const loader = document.getElementById("loader");
    let history = document.getElementById("history");
    if (history !== null) {
      history.innerHTML = "";
    }
    loader.classList.add("spinner-grow");
    await this.fetching(this.callback);
    loader.classList.remove("spinner-grow");
  };

  async fetching(callback){
    try {
      let url1 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.userInput.value}&limit=10&exchange=NASDAQ`;
      const response = await fetch(url1);
      const data = await response.json();
      callback(data);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  createHtml() {
    const card = document.createElement("div");
    const inputGroup = document.createElement("div");
    const userInput= document.createElement("input");
    const btn = document.createElement("button");
    const loaderDiv = document.createElement("div")
    const spinner = document.createElement("div")

    this.form.appendChild(card)
    card.appendChild(inputGroup)
    inputGroup.appendChild(userInput)
    card.appendChild(btn)
    cont.appendChild(loaderDiv)
    loaderDiv.appendChild(spinner)


    card.classList.add("main-search-input-wrap", "d-flex", "justify-content-center")
    inputGroup.classList.add("input-group")
    userInput.classList.add("form-control")
    userInput.setAttribute("id", "search")
    userInput.type = "text"
    userInput.placeholder = "Search..."
    btn.classList.add("main-search-button", "px-3")
    btn.setAttribute("id", "searchBtn")
    btn.innerText='Search'
    loaderDiv.setAttribute("id", "loaderDiv")
    loaderDiv.classList.add("centered", "d-flex", "flex-column")
    spinner.setAttribute("id", "loader")
    spinner.classList.add("align-self-center", "mt-2")
    this.userInput = userInput
  }
  
}





