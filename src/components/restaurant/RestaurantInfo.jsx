import React from "react";
import styles from "../../styles/restaurant/restaurantInfo.module.css";

export default function RestaurantInfo({ name, rating, description }) {
  const safeRating = Number(rating); // 문자열 대비
  const flooredRating = isNaN(safeRating) ? 0 : Math.floor(safeRating);
  const starImageSrc = `/images/icon/star_${flooredRating}.png`;

    return ( 
        <div className={styles.restaurantInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.rating}>
        <img src={starImageSrc} alt={`별점 ${flooredRating}`} />
        {isNaN(safeRating) ? "0.0" : safeRating}
            </div>
      <div className={styles.description}>
        <img src="/images/icon/dot_L.png" alt="dot left" />
        {description}
        <img src="/images/icon/dot_R.png" alt="dot right" />
      </div>
        </div>
    );
}
