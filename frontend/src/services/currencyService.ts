import http from "../http-common";
import currencyExchange from "../types/currencyExchange";

const getCurrencyList = () => {
  return http.get<Array<currencyExchange>>("/get-currency-list");
};

const runExchange = (data: currencyExchange) => {
  return http.post<currencyExchange>("/get-exchange", data);
};


const currencyService = {
  runExchange,
  getCurrencyList
};

export default currencyService;