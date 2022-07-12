class SearchForm {
  constructor(form) {
    this.form = form;
    this.createHtml();
    let cont = document.getElementById("cont");
    this.deb = this.debounce(this.list.bind(this));
  }

  async onSearch(callback) {
    this.callback = callback;
    document.getElementById("searchBtn").addEventListener("click", async () => {
      this.deb();
    });

    document.getElementById("search").addEventListener("keyup", async (e) => {
      this.deb();
    });
  }

  debounce(func) {
    let debounceTimer;
    return function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(), 2000);
    };
  }

  async list() {
    const loader = document.getElementById("loader");
    loader.classList.add("spinner-grow");
    const data = await this.fetching();
    this.callback(data);
    loader.classList.remove("spinner-grow");
  }

  async fetching() {
    try {
      let url1 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.userInput.value}&limit=10&exchange=NASDAQ`;
      const response = await fetch(url1);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  createHtml() {
    const card = document.createElement("div");
    const inputGroup = document.createElement("div");
    const userInput = document.createElement("input");
    const autoList = document.createElement("ul");
    const btn = document.createElement("button");
    const loaderDiv = document.createElement("div");
    const spinner = document.createElement("div");

    this.form.appendChild(card);
    card.appendChild(inputGroup);
    inputGroup.appendChild(userInput);
    inputGroup.appendChild(btn);
    card.appendChild(autoList);
    cont.appendChild(loaderDiv);
    loaderDiv.appendChild(spinner);

    card.classList.add(
      "main-search-input-wrap",
      "d-flex",
      "flex-column",
      "justify-content-center"
    );
    inputGroup.classList.add("input-group");
    userInput.classList.add("form-control");
    userInput.setAttribute("id", "search");
    userInput.type = "text";
    userInput.placeholder = "Search...";
    autoList.setAttribute("id", "auto");
    autoList.classList.add("list-unstyled", "my-1");
    btn.classList.add("main-search-button", "px-3");
    btn.setAttribute("id", "searchBtn");
    btn.innerText = "Search";
    loaderDiv.setAttribute("id", "loaderDiv");
    loaderDiv.classList.add("centered", "d-flex", "flex-column");
    spinner.setAttribute("id", "loader");
    spinner.classList.add("align-self-center", "mt-2");
    this.userInput = userInput;
  }
}
