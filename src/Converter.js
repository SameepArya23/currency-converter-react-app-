import React from "react";

export default function Converter(props) {
    const {
        currencyoptions,
        selectCrr,
        changeCrr,
        amountValue,
        changeAmount
    } = props
  return(
      <div>
          <input type="number" className="input" value={amountValue} onChange={changeAmount}/>
          <select value={selectCrr} onChange={changeCrr}>
              {currencyoptions.map(options => (
                  <option key={options} value={options}>{options}</option>
              ))}
          </select>
      </div>
  ) 
}
