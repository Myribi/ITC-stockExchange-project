const urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get("symbol");
const nameC = document.getElementById("nameC");
const companyLink = document.getElementById("companyLink");
const description = document.getElementById("description");
const stockPrice = document.getElementById("stockPrice");
const pChange = document.getElementById("pChange");
const sector = document.getElementById("sector");
const loader = document.getElementById("loader");
let myMarquee = document.getElementById("inside")

function marquee (){
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`)
    .then (response => response.json())
    .then (data =>{
        let spans = "";
        for (let i=0; i<data.length; i++){
          let cP = parseFloat(data[i].changesPercentage).toFixed(2)
            if (cP>=0){
            spans += `<span class="symb text-dark">${data[i].symbol}</span><span class="percent text-success"> (+${cP}%)</span>`;
        }else{
            spans += `<span class="symb text-dark">${data[i].symbol}</span><span class="percent text-danger"> (${cP}%)</span>`;
        }
    }
    myMarquee.innerHTML = spans
    })
    return myMarquee;
    }
    marquee()
    

async function companyProfile(symbol) {
    loader.classList.add("spinner-grow");
  try {
    let url1 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    const response = await fetch(url1);
    const data = response.json();
    loader.classList.remove("spinner-grow");
    return data;
  } catch (err) {
    console.log("error: ", err);
  }
}

function displayProfile(profile) {
  companyLink.href = profile.website;
  image.src = profile.image;
  nameC.innerText = profile.companyName;
  nameC.innerHTML = `<a href="${profile.website}" class="text-decoration-none text-dark">${profile.companyName} </a>`;
  description.innerText = profile.description;
  stockPrice.innerText = `Stock price: $${profile.price}`;
  sector.innerText = `(${profile.sector})`;
  let pCP = parseFloat(profile.changesPercentage).toFixed(2)
  pChange.innerText = `(${pCP}%)`;
  if (profile.changesPercentage.includes("-")) {
    pChange.style.color = "red";
  } else {
    pChange.innerText = `(+${pCP}%)`;
    pChange.style.color = "green";
  }
}
companyProfile(symbol).then(function (response) {
  displayProfile(response.profile);
});

async function historyStockPrice() {
  let url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;

  const response = await fetch(url2);
  const data = await response.json();

  const length = data.historical.length;
  let labels = [];
  let values = [];

  for (i = 0; i < length - i - 1; i += 5) {
    labels.push(data.historical[i].date);

    values.push(data.historical[i].close);
  }
  labels = labels.reverse();
  values = values.reverse();
  new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Stock Price History",
          pointRadius: 0,
          data: values,
          backgroundColor: "rgba(0,250,154,0.2)",
          borderColor: "rgb(0,250,154)",
        },
      ],
    },
    options: { fill: true },
  });
}

console.log(historyStockPrice());
