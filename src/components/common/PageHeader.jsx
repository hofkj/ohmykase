import React from "react";
import styles from "../../styles/common/PageHeader.module.css";

function PageHeader(props) {

  return (
    <div className={styles.container}>
     <div className={styles.text}>{props.text}</div>
    </div>
  );
}

export default PageHeader;
