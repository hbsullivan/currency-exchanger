import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CurrencyService, RatesService} from './currency-services';

//Business Logic


function getExchange(currency, amount) {
  let promise = CurrencyService.getExchange(currency, amount);
  promise.then(function(currencyDataArray) {
    printElements(currencyDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getRates() {
  let promise = RatesService.getRates();
  promise.then(function(rates) {
    printRates(rates);
  }, function(errors) {
    printRatesError(errors);
  });
}

function printRates(data) {
  document.getElementById("eur").innerText = `EUR: ${data.conversion_rates.EUR}`;
  document.getElementById("rub").innerText = `RUB: ${data.conversion_rates.RUB}`;
  document.getElementById("gtq").innerText = `GTQ: ${data.conversion_rates.GTQ}`;
  document.getElementById("aud").innerText = `AUD: ${data.conversion_rates.AUD}`;
  document.getElementById("jpy").innerText = `JPY: ${data.conversion_rates.JPY}`;
  document.getElementById("ex-rates").removeAttribute("class");
}

function printRatesError(errors) {
  document.getElementById("rates-error").innerText = `There was an error finding your conversion rates: ${errors[0].status} ${errors[1].result}`;
}

function printElements(data) {
  if (data[0].conversion_result.toFixed() === undefined) {
    document.getElementById("output").innerText = "Please enter how much money you would like to exchange";
  } else {
    document.getElementById("output").innerText = `That will get you ${data[0].conversion_result.toFixed(2)} in ${data[0].target_code}`;
  }
}


function printError(uhOh) {
  if (uhOh[0].status === 404) {
    document.getElementById("output").innerText = "That currency doesn't exist. Please try again.";
  } else {
    document.getElementById("output").innerText = `There was an error converting your currency: ${uhOh[0].status} ${uhOh[1].result}`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.getElementById("currency").value;
  const amount = document.getElementById("amount").value;
  getExchange(currency, amount);
}

window.addEventListener("load", function() {
  document.getElementById("input-form").addEventListener("submit", handleFormSubmission);
  document.getElementById("see-rates").addEventListener("click", getRates);
});