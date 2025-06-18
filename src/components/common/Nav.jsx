import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../../styles/common/nav.module.css";

function Nav(props) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_item} onClick={() => handleClick("/")}>
        <div className={styles.home} style={{ color: props.homeColor }}>
          <img src={props.home} alt="home" />홈
        </div>
      </div>
      <div className={styles.nav_item} onClick={() => handleClick("/MapPage")}>
        <div className={styles.map} style={{ color: props.mapColor }}>
          <img src={props.map} alt="map" />
          지도
        </div>
      </div>
      <div className={styles.nav_item} onClick={() => handleClick("/NavReviewPage")}>
        <div className={styles.review} style={{ color: props.reviewColor }}>
          <img src={props.review} alt="review" />
          리뷰
        </div>
      </div>
      <div className={styles.nav_item} onClick={() => handleClick("/NavReservationPage")}>
        <div
          className={styles.reservation}
          style={{ color: props.reservationColor }}
        >
          <img src={props.reservation} alt="reservation" />
          예약
        </div>
      </div>
      <div className={styles.nav_item} onClick={() => handleClick("/MyPage")}>
        <div className={styles.profile} style={{ color: props.profileColor }}>
          <img src={props.profile} alt="profile" />
          프로필
        </div>
      </div>
    </div>
  );
}

export default Nav;
