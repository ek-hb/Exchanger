const url = "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";
const urlOne =
  "https://api.privatbank.ua/p24api/exchange_rates?date=01.12.2014";

async function privatbank(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const eur = data[0];
    const usd = data[1];
    const table = document.querySelector(".tableCourse");
    if (table) {
      let counter = 0;
      const elem = data.map((item) => {
        counter++;
        return `<tr><td>${item.ccy}</td><td>${item.base_ccy}</td><td>${item.buy}</td><td>${item.sale}</td></tr>`;
      });
      table.innerHTML = elem.join("");
      let btn = document.getElementById("btn");
      let btn2 = document.getElementById("btn2");
      let input = document.getElementById("input");
      let select = document.getElementById("select");
      let p = document.getElementById("p");

      btn.addEventListener("click", () => {
        let u = +usd.sale;
        let s = select.value;
        let e = +eur.sale;
        if (select.value === "usd") {
          let calc = u * input.value;
          p.innerHTML = calc;
        } else if (select.value) {
          let calc = e * input.value;
          p.innerHTML = calc;
        }
      });
      btn2.addEventListener("click", () => {
        let u = +usd.sale;
        let s = select.value;
        let e = +eur.sale;
        if (select.value === "usd") {
          let calc = input.value / u;
          p.innerHTML = calc;
        } else if (select.value) {
          let calc = input.value / e;
          p.innerHTML = calc;
        }
      });
    }
  } catch (error) {
    console.error("error", error);
  }
}

privatbank(url);

async function otherPrivatbank(urlOne) {
  const tableOne = document.querySelector(".otherTableCourse");
  try {
    const responseOne = await fetch(urlOne);
    const dataOne = await responseOne.json();
    const CHF = dataOne[2];
    const GBP = dataOne[3];
    const PLZ = dataOne[4];
    const SEK = dataOne[5];
    const XAU = dataOne[6];
    const CAD = dataOne[7];
    if (tableOne) {
      let counterOne = 0;
      const elemOne = dataOne.exchangeRate.map((item) => {
        counterOne++;
        return `<tr><td>${item.currency}</td><td>${item.baseCurrency}</td><td>${item.saleRateNB}</td><td>${item.purchaseRateNB}</td></tr>`;
      });
      tableOne.innerHTML = elemOne.join("");
    }
  } catch (error) {
    console.log(error);
  }
  const BtnOne = document.querySelector(".otherBtn");
  BtnOne.addEventListener("click", () => {
    console.log("Btn Work");
    tableOne.classList.add("otherTableCourseNew");
  });
}
otherPrivatbank(urlOne);
