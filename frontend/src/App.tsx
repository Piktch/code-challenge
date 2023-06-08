import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import currencyService from "./services/currencyService"
import currencyExchange from "./types/currencyExchange";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import currencyArray from "./constants/currencyList"

function App() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  return (
    <>
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
      <div>{toValue}</div>
    </Stack>
    <Button 
    variant="contained"
    onClick={()=>{
      currencyService.runExchange({
        from: fromCurrency,
        fromValue: fromValue,
        to: toCurrency,
      })
          .then((response: any) => {
            console.log(response);
            if(response.data.status == "success") {
              setToValue(response.data.value)
            }
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }}
    >Convert</Button>
    </>
    
  )
}

export default App;
