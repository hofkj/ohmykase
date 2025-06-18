import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../../styles/common/titleHeaderBar.module.css";

function TitleHeaderBar({ title, onArrowClick }) {
  const navigate = useNavigate(); 

  const handleClick = () => {
    if (onArrowClick) {
      onArrowClick();
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <img 
        src="/images/icon/header_arrow.png" 
        className={styles.arrow} 
        onClick={handleClick} 
        alt="Back Arrow"
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default TitleHeaderBar;
