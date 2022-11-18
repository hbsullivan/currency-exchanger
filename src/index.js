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