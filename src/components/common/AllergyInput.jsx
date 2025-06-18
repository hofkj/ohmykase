import React, { useState } from "react";
import styles from "../../styles/common/allergyInput.module.css";

function AllergyInput({ title, allergyList = [], setAllergyList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddAllergy = () => {
    if (inputValue.trim() !== "") {
      setAllergyList([...allergyList, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveAllergy = (index) => {
    const updated = allergyList.filter((_, i) => i !== index);
    setAllergyList(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.input}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="음식을 적어주세요"
        />
        <img
          src="/images/icon/enter_gray.png"
          className={styles.enter}
          onClick={handleAddAllergy}
          alt="Enter"
        />
      </div>
      <div className={styles.tagsContainer}>
        <div className={styles.allergyTags}>
          {allergyList.map((allergy, index) => (
            <div key={index} className={styles.tag}>
              {allergy}
              <img
                src="/images/icon/x.png"
                alt="Remove"
                className={styles.removeIcon}
                onClick={() => handleRemoveAllergy(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllergyInput;
