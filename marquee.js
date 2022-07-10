class Marquee {
  constructor(spans) {
    
    this.spans = spans;

  }

  async load(companies) {

    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`
    );
    const data = await response.json();

    for (let i = 0; i < 100; i++) {
      this.spans.innerHTML += `<span class="symb text-dark">${data[i].symbol}</span><span class="percent"> ($${data[i].price})</span>`;
    }
  }
}




