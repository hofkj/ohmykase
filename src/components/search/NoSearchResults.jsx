import React from "react";
import styles from "../../styles/pages/searchPage.module.css";

function NoSearchResults({ keyword }) {
  return (
    <div>
      <div className={styles.noneContainer}>
        <div className={styles.none}>
          “{keyword}” 검색 결과가 없습니다
        </div>
        <div className={styles.input}>정확한 키워드를 입력해주세요</div>
      </div>
    </div>
  );
}

export default NoSearchResults;
