class SearchResult {
  constructor(results) {
    this.results = results;
  }

  renderResults(companies) {
	this.createHtml2();
    let ol = document.createElement("ol");
	
	let history = document.getElementById("results");
    ol.setAttribute("id", "historyList");
    history.innerHTML = "";
    for (let i of companies) {
      let li = document.createElement("li");
      this.companyProfile(i.symbol).then(function (response) {
        let imageUrl = response.profile.image;
        let pChange = parseFloat(response.profile.changesPercentage).toFixed(2);

        li.innerHTML = `<img class="logos" src=${imageUrl}>`;
        li.innerHTML += `<a class="text-decoration-none d-flex align-items-center" href = "/company.html?symbol=${i.symbol}"> <div class="name">${i.name}</div> <div class="parentesis text-secondary fs-6">(${i.symbol})</div></a> `;

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
        history.appendChild(ol);
      });
    }
  }

  async companyProfile(symbol) {
	try {
	let url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
	const response = await fetch(url2);
	const data = response.json();
	return data;
	} catch (err) {
		console.log('error: ', err); 
	}
  
  }

createHtml2 () {
	const loaderDiv = document.getElementById("loaderDiv")
	
// let history = document.createElement("div")
// history.setAttribute("id", "history")
// history.classList.add("d-flex", "justify-content-center", "pb-4")

loaderDiv.appendChild(results)

}

}



