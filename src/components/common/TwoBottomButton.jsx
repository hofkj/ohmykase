import React from "react";
import styles from "../../styles/common/TwoBottomButton.module.css";
import { useNavigate } from "react-router-dom";

function TwoBottomButton({ back, next, navigateToBack, navigateToNext, onNextClick, backState }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (navigateToBack) {
      navigate(navigateToBack, { state: backState }); 
    }
  };

  const handleNextClick = () => {
    if (onNextClick) {
      onNextClick();
    } else if (navigateToNext) {
      navigate(navigateToNext); 
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.backBtn} onClick={handleBackClick}>
        {back}
      </button>
      <button className={styles.nextBtn} onClick={handleNextClick}>
        {next}
      </button>
    </div>
  );
}

export default TwoBottomButton;
