import React from "react";
import styles from "../../styles/common/bottomButton.module.css";
import { useNavigate } from "react-router-dom";

function BottomButton({ text, navigateTo, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); 
    } else if (navigateTo) {
      navigate(navigateTo); 
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.btn} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
}

export default BottomButton;
