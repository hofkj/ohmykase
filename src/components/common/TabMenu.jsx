import React from "react";
import styles from "../../styles/common/tabMenu.module.css";

export default function TabMenu({ activeTab, setActiveTab, option1, option2 }) {
    return (
        <div className={styles.tabMenu}>
            <button 
                className={activeTab === "store" ? styles.active : ""}
                onClick={() => setActiveTab("store")}
            >
                {option1}
            </button>
            <button 
                className={activeTab === "review" ? styles.active : ""}
                onClick={() => setActiveTab("review")}
            >
                {option2}
            </button>
        </div>
    );
}
