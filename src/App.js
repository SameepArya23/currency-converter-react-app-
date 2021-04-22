import React, { useEffect, useState } from "react";
import "./App.css";
import Converter from "./Converter";
import exchange from "./exchange.png";

const api = "https://open.exchangerate-api.com/v6/latest/USD";

function App() {
  const [crrOptions, setcrrOptions] = useState([]);
  // console.log(crrOptions)
  const [fromCrr, setfromCrr] = useState();
  const [toCrr, settoCrr] = useState();
  const [exchangeRate, setexchangeRate] = useState();
  const [amountVal, setamountVal] = useState(1);
  const [CrrFromAmount, setCrrFromAmount] = useState(true);

  let toAmountVal, fromAmountVal;
  if (CrrFromAmount) {
    fromAmountVal = amountVal;
    toAmountVal = amountVal * exchangeRate;
  } else {
    toAmountVal = amountVal;
    fromAmountVal = amountVal / exchangeRate;
  }

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const firstCrr = Object.keys(data.rates)[0];
        const secondCrr = Object.keys(data.rates)[65];
        setcrrOptions([...Object.keys(data.rates)]);
        setfromCrr(firstCrr);
        settoCrr(secondCrr);
        setexchangeRate(data.rates[secondCrr]);
      });
  }, []);

  function handleFromAmountChange(e) {
    setamountVal(e.target.value);
    setCrrFromAmount(true);
  }

  useEffect(() => {
    if (fromCrr != null && toCrr != null) {
      fetch(`${api}?base=${fromCrr}&symbols=${toCrr}`)
        .then((res) => res.json())
        .then((data) => setexchangeRate(data.rates[toCrr]));
    }
  }, [fromCrr, toCrr]);

  function handleToAmountChange(e) {
    setamountVal(e.target.value);
    setCrrFromAmount(false);
  }

  return (
    <div className="app">
      <h1>convert</h1>
      <Converter
        currencyoptions={crrOptions}
        selectCrr={fromCrr}
        changeCrr={(e) => setfromCrr(e.target.value)}
        changeAmount={handleFromAmountChange}
        amountValue={fromAmountVal}
      />
      <img src={exchange} className="convertlogo" alt="" />
      <Converter
        currencyoptions={crrOptions}
        selectCrr={toCrr}
        changeCrr={(e) => settoCrr(e.target.value)}
        changeAmount={handleToAmountChange}
        amountValue={toAmountVal}
      />
    </div>
  );
}

export default App;
