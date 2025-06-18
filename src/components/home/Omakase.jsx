import React from "react";
import styles from "../../styles/home/omakase.module.css";

function Omakase({ title, subtitle, onMoreClick }) {
  return (
    <div className={styles.omakaseContainer}>
      <div className={styles.omakaseHeader}>
        <div className={styles.omakaseTitle}>{title}</div>
        <div className={styles.omakaseSubtitle}>{subtitle}</div>
      </div>

      {onMoreClick && (
        <div className={styles.omakaseMore} onClick={onMoreClick}>
          <div>
            더보기 <img src="/images/icon/arrow.png" className={styles.arrow} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Omakase;