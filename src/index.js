import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-services';

//Business Logic


function getExchange(currency, amount) {
  let promise = CurrencyService.getExchange(currency, amount);
  promise.then(function(currencyDataArray) {
    printElements(currencyDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function printElements(data) {
  document.getElementById("output").innerText = `That will get you ${data[0].conversion_result.toFixed(2)} in ${data[0].target_code}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.getElementById("currency").value;
  const amount = document.getElementById("amount").value;
  getExchange(currency, amount);
}

window.addEventListener("load", function() {
  document.getElementById("input-form").addEventListener("submit", handleFormSubmission);
});