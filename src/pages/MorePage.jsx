import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import ResultOmakase from "../components/search/ResultOmakase";
import Nav from "../components/common/Nav";
import styles from "../styles/pages/StoragePage.module.css";

function MorePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const restaurants = location.state?.shops || [];
  const pageTitle = location.state?.title || "전체 오마카세";

  const handleArrowClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title={pageTitle} onArrowClick={handleArrowClick} />

      <div className={styles.omakaseContainer}>
        {restaurants.map((restaurant, index) => (
          <ResultOmakase key={index} restaurant={restaurant} />
        ))}
      </div>

      <Nav
        home="/images/nav/home.png"
        map="/images/nav/map.png"
        review="/images/nav/review.png"
        reservation="/images/nav/reservation.png"
        profile="/images/nav/profile_red.png"
        homeColor="#747474"
        mapColor="#747474"
        reviewColor="#747474"
        reservationColor="#747474"
        profileColor="#BB0038"
      />
    </div>
  );
}

export default MorePage;
