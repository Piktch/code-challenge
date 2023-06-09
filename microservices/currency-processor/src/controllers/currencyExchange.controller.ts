import * as express from 'express';
// Here I am fetching Exchange Rates based on USD
let rate = {
  "AED": 3.67299,
  "AFN": 86.166005,
  "ALL": 99.061113,
  "AMD": 387.04,
  "ANG": 1.802094,
  "AOA": 612.5,
  "ARS": 244.394286,
  "AUD": 1.489365,
  "AWG": 1.8,
  "AZN": 1.7,
  "BAM": 1.822664,
  "BBD": 2,
  "BDT": 108.248674,
  "BGN": 1.814585,
  "BHD": 0.377021,
  "BIF": 2833.75,
  "BMD": 1,
  "BND": 1.347287,
  "BOB": 6.909116,
  "BRL": 4.9239,
}
export const currencyExchangeController = express.Router().post('/get-exchange', async (req: express.Request, res: express.Response) => {
  const responceWait = new Promise<any>((resolve, reject) => {
    fetch("https://openexchangerates.org/api/latest.json?app_id=f84076fd2e8f4b8abd3e080f9a1b4798")
    .then(response  => {
      if(!response .ok) {
        resolve({ status: "error", message: "Can`t get Exchange Rates!!"})
      }
      return response.json()
    })
    .then(data => {
      resolve(data)
    })
    .catch((error: Error) => {
      resolve({status: "error", message: "Error fetching Exchange rates"})
    })
  })
  let exchangeRates = await responceWait // I planed to cache exchange rate structure to call openexchangerates.org once pear 2 hours...
  if(exchangeRates.rates) {
    if(req.body.fromValue && req.body.from && req.body.to) {
      let usd = req.body.fromValue / exchangeRates.rates[req.body.from]
      let expectedCurrencyValue = usd * exchangeRates.rates[req.body.to]
      return res.json({status: "success", value: expectedCurrencyValue})
    } else {      
      return res.json({ status: "error", message: "Something went wrong!"})
    }
  }
  return res.json({ status: "error", message: "Something went wrong!"})
})
