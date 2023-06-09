import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import currencyService from "./services/currencyService"
import currencyExchange from "./types/currencyExchange";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import currencyArray from "./constants/currencyList"
import Container from '@mui/material/Container';
import { margin } from '@mui/system';
import Typography from '@mui/material/Typography';

function App() {
  const [history,setHistory] = useState<currencyExchange[]>(()=>{
    let savedHistory = localStorage.getItem("convertationHistory")
    if(savedHistory) {
      return JSON.parse(savedHistory)
    } else {
      return []
    }
  })
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  return (
    <>
      <Container sx={{ mt: "2rem", mb: "1rem" }} maxWidth="sm">
        <Typography variant="button" display="block" gutterBottom>
          Convert from:
        </Typography>
        <Stack spacing={2} direction="row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={currencyArray}
            sx={{ width: 300 }}
            renderInput={(params) => {
              return <TextField {...params} label="Currency" />
            }}
            onInputChange={(event, newInputValue) => {
              setFromCurrency(newInputValue)
            }}
          />
          <TextField
            id="fromValue"
            label="amount"
            variant="standard"
            type="number"
            value={fromValue}
            onChange={(e) => {
              setFromValue(Number.parseFloat(e.target.value))
            }}
          />
        </Stack>
      </Container >
      <Container sx={{ mb: "1rem" }} maxWidth="sm">
        <Typography variant="button" display="block" gutterBottom>
          Convert to:
        </Typography>
        <Stack spacing={2} direction="row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={currencyArray}
            sx={{ width: 300 }}
            renderInput={(params) => {
              return <TextField {...params} label="Currency" />
            }}
            onInputChange={(event, newInputValue) => {
              setToCurrency(newInputValue)
            }}
          />
          <Typography fontSize={"1rem"} variant="button" display="block" gutterBottom>
            {toValue.toLocaleString(navigator.language, { maximumFractionDigits: 2 })}
          </Typography>
        </Stack>
      </Container>
      <Container maxWidth="sm">
        <Button
          variant="contained"
          onClick={() => {
            currencyService.runExchange({
              from: fromCurrency,
              fromValue: fromValue,
              to: toCurrency,
            })
              .then((response: any) => {
                if (response.data.status == "success") {
                  setToValue(response.data.value)
                  setHistory((prevHist)=>{
                    if(history.length > 9) {
                      history.shift()
                    }
                    let updatedArray = [...prevHist, {
                      from: fromCurrency,
                      fromValue: fromValue,
                      to: toCurrency,
                      toValue: response.data.value
                    }]
                    localStorage.setItem("convertationHistory", JSON.stringify(updatedArray))
                    return updatedArray
                  })
                }
              })
              .catch((e: Error) => {
                console.log(e);
              });
          }}
        >Convert</Button>
      </Container>
      <Container sx={{ mt: "2rem" }} maxWidth="sm">
        <Typography fontSize={"1rem"} variant="button" display="block" gutterBottom>
          Last conversations history:
        </Typography>
        {history.slice(0).reverse().map((item, index)=>{
          return (
          <Typography key={"historyObj" + index} sx={{ borderBottom: 1 }} fontSize={"1rem"} variant="button" display="block" gutterBottom>
            {item.from}:{item.fromValue} = {item.to}:{item.toValue?item.toValue.toLocaleString(navigator.language, { maximumFractionDigits: 2 }):''}
          </Typography>
          )
        })}
      </Container>
    </>
  )
}

export default App;
