/* 
Feedback from Erik Solhaug

# Try shortening (re-factor) the code
# Utilize forEach method to increase readability of code 

*/

const url = "https://api.coinlore.net/api/tickers/";
const coinContainer = document.querySelector(".table");
const skeletonLoader = document.querySelector(".card");

const fetchData = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;

    let trend = "";
    let html = "";

    data.forEach((el, index) => {
      const id = el.id;
      const name = el.name;
      const shortName = el.symbol;
      const priceUsd = el.price_usd;
      const price24h = el.percent_change_24h;

      if (index === 10) throw {};

      if (price24h < 0) {
        trend = "negative";
      } else {
        trend = "positive";
      }

      html += `
        <div class="tbody">
          <div class="tbody-coin">
            <p>${name}</p>
            <p>${shortName}</p>
          </div>
          <div class="tbody-info">
            <p>$${priceUsd}</p>
            <p class="${trend}">${price24h}%</p>
          </div>
        </div>
      `;

      coinContainer.innerHTML = html;
    });
  } catch (error) {
    console.log(error);
  }
};

fetchData();
