import * as express from 'express';
// Here I am fetching Exchange Rates based on USD
export const currencyExchangeController = async (req: express.Request, res: express.Response) => {
  const responceWait = new Promise((resolve, reject) => {
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
  return res.json(await responceWait)
}
