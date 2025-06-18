import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import styles from "../styles/pages/StoragePage.module.css";
import ResultOmakase from "../components/search/ResultOmakase";
import Nav from "../components/common/Nav";
import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

function StoragePage() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";

  useEffect(() => {
    axios
      .get(`/api/bookmark/user/${apiKey}`, {
        withCredentials: true,
      })
      .then((res) => {
        const bookmarkList = res.data.bookmark_list || [];
        setRestaurants(bookmarkList);
      })
      .catch((err) => {
        console.error("북마크 목록 불러오기 실패:", err);
      });
  }, []);

  const handleArrowClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="저장한 오마카세" onArrowClick={handleArrowClick} />

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

export default StoragePage;
