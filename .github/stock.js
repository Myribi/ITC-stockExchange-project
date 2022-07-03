let userInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
let history = document.getElementById("history");

async function search() {
  let url1 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput.value}&limit=10&exchange=NASDAQ`;
  const response = await fetch(url1);
  const data = await response.json();
  displayList(data);
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
    li.innerHTML = `<a class="text-decoration-none" href = "/company.html?symbol=${i.symbol}"> ${i.name} (${i.symbol})</a>`
    ol.classList.add("list-unstyled", "w-75");
    li.classList.add("fs-5", "border-bottom", "border-secondary", "py-2");
    ol.appendChild(li);
    history.appendChild(ol);
  }
}
