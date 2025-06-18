import React from "react";
import styles from "../../styles/reservation/FoodAmountSelector.module.css";

function FoodAmountSelector({ label, value, setValue }) {
  return (
    <div className={styles.foodAmountContainer}>
      <label>{label}</label>
      <div className={styles.foodAmount}>
        <div className={styles.radioLabel}>매우 적게</div>
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`${styles.radio} ${value == num ? styles.selected : ""}`}
            onClick={() => setValue(num.toString())}
          />
        ))}
        <div className={styles.radioLabel}>매우 많이</div>
      </div>
    </div>
  );
}

export default FoodAmountSelector;
