export default class CurrencyService {
  static getExchange(currency, amount) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/ed0e446568c59e5e28832b2/pair/USD/${currency}/${amount}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, currency, amount]);
        } else {
          reject([this, response, currency, amount]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}

// ${process.env.API_KEY}