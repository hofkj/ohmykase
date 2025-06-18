import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/search/ResultOmakase.module.css";

function ResultOmakase({ restaurant }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/RestaurantPage/${restaurant.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 선택사항: 페이지 이동 시 스크롤 맨 위로
  };

  return (
    <div className={styles.container} style={{ cursor: "pointer" }} onClick={handleClick}>
      <div className={styles.restaurantCard}>
        <img
          src={
            restaurant.galleryImages?.[0] || "/images/restaurant/restaurant.png"
          }
          alt="Restaurant"
          className={styles.img}
        />
        <div className={styles.shadowOverlay}></div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.name}>{restaurant.shop_name}</div>
        <div className={styles.infoContainer}>
          <img src="/images/icon/star.png" className={styles.star} alt="별점" />
          <div className={styles.rating}>{restaurant.rating}</div>
          <div className={styles.location}>{restaurant.area_name}</div>
        </div>
      </div>
    </div>
  );
}

export default ResultOmakase;
