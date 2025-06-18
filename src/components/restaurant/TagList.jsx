import React from "react";
import styles from "../../styles/restaurant/tagList.module.css";

export default function TagList({ tags }) {
    return (
        <div className={styles.tagList}>
            {(tags || []).map((tag, index) => (
                <span key={index} className={styles.tag}>#{tag}</span>
            ))}
        </div>
    );
}