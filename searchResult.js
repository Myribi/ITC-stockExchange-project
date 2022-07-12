class SearchResult {
  constructor(element) {
    this.element = element;
  }

  async renderResults(companies) {
    this.createHtml2();
    let search = document.getElementById("search");
    let ol = document.createElement("ol");
    ol.setAttribute("id", "historyList");
    this.element.innerHTML = " ";
    for (let i of companies) {
      let li = document.createElement("li");
      li.setAttribute("id", "lines");
      const response = await this.companyProfile(i.symbol);
      let imageUrl = response.profile.image;
      let pChange = parseFloat(response.profile.changesPercentage).toFixed(2);

      let highlightedName = response.profile.companyName.replace(
        new RegExp(search.value, "gi"),
        (matchName) => `<mark class="text-dark">${matchName}</mark>`
      );
      let highlightedSymbol = response.symbol.replace(
        new RegExp(search.value, "gi"),
        (matchSymbol) => `<mark class="text-dark">${matchSymbol}</mark>`
      );

      if (search.value.length > 1) {
        li.innerHTML = `<img class="logos" src=${imageUrl}>`;
        li.innerHTML += `<a class="text-decoration-none d-flex align-items-center" href = "/company.html?symbol=${i.symbol}"> <div id="name" class="name">${highlightedName}</div> <div id="symbol" class="parentesis text-secondary fs-6">(${highlightedSymbol})</div></a> `;
      } else {
        li.innerHTML = `<img class="logos" src=${imageUrl}>`;
        li.innerHTML += `<a class="text-decoration-none d-flex align-items-center" href = "/company.html?symbol=${i.symbol}"> <div id="name" class="name">${i.name}</div> <div id="symbol" class="parentesis text-secondary fs-6">(${i.symbol})</div></a> `;
      }

      if (pChange < 0) {
        li.innerHTML += `<div class="text-danger fs-6" >(${pChange}%)</div>`;
      } else {
        li.innerHTML += `<div class="text-success fs-6" >(+${pChange}%)</div>`;
      }

      ol.classList.add("list-unstyled", "pad");
      li.classList.add(
        "fs-5",
        "border-bottom",
        "py-2",
        "d-flex",
        "align-items-center",
        "list"
      );

      ol.appendChild(li);
      this.element.appendChild(ol);
    }
  }

  async companyProfile(symbol) {
    try {
      let url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
      const response = await fetch(url2);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  createHtml2() {
    const loaderDiv = document.getElementById("loaderDiv");
    loaderDiv.appendChild(results);
  }
}
