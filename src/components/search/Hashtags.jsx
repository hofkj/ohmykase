import React from "react";
import styles from '../../styles/search/hashtag.module.css';

function Hashtag(props) {
  return (
        <div className={styles.container}>#{props.info}</div>
  );
}

export default Hashtag;
