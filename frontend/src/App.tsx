import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const currencyArray = [
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL"
]

function App() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={currencyArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  )
}

export default App;
