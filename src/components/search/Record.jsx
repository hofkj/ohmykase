import React from "react";
import styles from "../../styles/search/record.module.css";

function Record({ keyword }) {
  return (
    <div className={styles.container}>
      <img
        src="../../images/icon/search_icon.png"
        className={styles.searchIcon}
        alt="search icon"
      />
      <div>{keyword}</div>
    </div>
  );
}

export default Record;
