import React from "react";
import styles from "../../styles/common/inputContainer.module.css";

function InputContainer({ title, value, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.input}>
        <input
          placeholder={title}
          value={value}
          onChange={onChange} 
        />
      </div>
    </div>
  );
}

export default InputContainer;
