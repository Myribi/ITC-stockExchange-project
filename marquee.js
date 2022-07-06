
     class marqueeClass {
        constructor(spans) {
            this.spans = spans;
        }
        
       async load() {
        const response = await fetch (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`);
        const data = await response.json();
        
        for (let i=0; i<100; i++){
            let cP = parseFloat(data[i].changesPercentage).toFixed(2)
                if (cP >= 0){
                    this.spans.innerHTML += `<span class="symb text-dark">${data[i].symbol}</span><span class="percent text-success"> (+${cP}%)</span>`;
                }else{
                    this.spans.innerHTML += `<span class="symb text-dark">${data[i].symbol}</span><span class="percent text-danger"> (${cP}%)</span>`;
                }
            }
       }
    }

    async function marquee() {
        const myMarquee = document.getElementById("inside")
        let myMarquee2 = new marqueeClass(myMarquee);
        await myMarquee2.load();
    }

    marquee();




































    