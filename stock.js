let userInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
let history = document.getElementById("history");


async function search() {
  try {
  let url1 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput.value}&limit=10&exchange=NASDAQ`;
  const response = await fetch(url1);
  const data = await response.json();
  displayList(data);

} catch (err) {
  console.log('error: ', err); 
}
}

searchBtn.addEventListener("click", async function () {
  if (history !== null) {
    history.innerHTML = "";
  }
  loader.classList.add("spinner-grow");
  await search();
  loader.classList.remove("spinner-grow");
});

function displayList(listeArr) {
  let ol = document.createElement("ol");
  ol.setAttribute("id", "historyList");
  history.innerHTML = "";
  for (let i of listeArr) {
    let li = document.createElement("li");
    companyProfile(i.symbol).then(function (response) {
     
      let imageUrl = response.profile.image;
      let pChange = parseFloat(response.profile.changesPercentage).toFixed(2)
      
   
      li.innerHTML = `<img class="logos" src=${imageUrl}>`;
      li.innerHTML += `<a class="text-decoration-none d-flex align-items-center" href = "/company.html?symbol=${i.symbol}"> <div class="name">${i.name}</div> <div class="text-secondary fs-6">(${i.symbol})</div></a> `;
      
      
      if(pChange<0) {
        li.innerHTML += `<div class="text-danger fs-6" >(${pChange}%)</div>`;
      } else {
        li.innerHTML += `<div class="text-success fs-6" >(+${pChange}%)</div>`;
      }
      
      ol.classList.add("list-unstyled", "w-75");
      li.classList.add(
        "fs-5",
        "border-bottom",
        "border-secondary",
        "py-2",
        "d-flex",
        "align-items-center"
      );

      ol.appendChild(li);
      history.appendChild(ol);
    });
  }
}

async function companyProfile(symbol) {
  try {
  let url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  const response = await fetch(url2);
  const data = response.json();
  return data;
  } catch (err) {
      console.log('error: ', err); 
  }

}



