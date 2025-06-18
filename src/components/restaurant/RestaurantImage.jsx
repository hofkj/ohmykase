import React from "react";
import styles from "../../styles/restaurant/restaurantImage.module.css";
import Arrow from "./Arrow";

export default function RestaurantImage({ imageUrl }) {
    return (
        <div className={styles.restaurantImage}>
            {/* <img src="../../images/icon/arrow_white.png" className={styles.arrow}/> */}
            <div className={styles.btn}><Arrow/></div> 
            <img src={imageUrl} alt="레스토랑 대표 이미지" className={styles.img}/>
        </div>
    );
}
