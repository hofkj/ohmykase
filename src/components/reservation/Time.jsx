import React from "react";
import styles from "../../styles/reservation/time.module.css"; // CSS 모듈 임포트

function Time({ time, isActive, onClick }) {
    return (
        <div 
            className={styles.time}
            onClick={onClick} 
            style={{
                backgroundColor: isActive ? "#BB0038" : "#FFF",  // isActive에 따라 배경색 변경
                cursor: "pointer",
                color: isActive ? "#FFF" : "#BB0038"
            }}
        >
            {time}
        </div>
    );
}

export default Time;
