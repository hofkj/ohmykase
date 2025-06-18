import React, { useState } from "react";
import styles from "../../styles/reservation/PriceRangeInput.module.css"; 

function PriceRangeInput({ label, minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className={styles.priceRangeContainer}>
      <label>{label}</label>
      <div className={styles.priceRangeInputs}>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="¥ 1,000"
        />
        <span>~</span>
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="¥ 10,000"
        />
      </div>
    </div>
  );
}


export default PriceRangeInput;
