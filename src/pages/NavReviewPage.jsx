import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/pages/NavReviewPage.module.css";
import TabMenu from "../components/common/TabMenu";
import ReviewContainer from "../components/review/ReviewContainer";
import Nav from "../components/common/Nav";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// 백엔드가 실제 돌고 있는 호스트&포트
const API_HOST = "http://localhost:3000";
// 이미지도 동일 호스트에서 제공
const IMAGE_HOST = `${API_HOST}/uploads/reviews/`;

export default function NavReviewPage() {
  const [activeTab, setActiveTab] = useState("store");
  const [allReviews, setAllReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url =
          activeTab === "store"
            ? `${API_HOST}/api/review/all/${apiKey}`
            : `${API_HOST}/api/review/my/${apiKey}`;
        const res = await axios.get(url, { withCredentials: true });
        console.log("API raw data:", res.data);

        const mapped = res.data.map((r) => {
          let files = [];
          if (typeof r.images === "string" && r.images.trim().startsWith("[")) {
            try {
              files = JSON.parse(r.images);
            } catch {
              files = [];
            }
          } else if (r.images) {
            files = [r.images];
          }
          const imageUrls = files.map((fname) => IMAGE_HOST + fname);

          return {
            reviewId: r.review_id,
            reservationId: r.reservation_id,
            username: r.user,
            userProfile: "/images/icon/profile.png",
            restaurantName: r.shop_name,
            rating: r.rating,
            timeAgo: r.date,
            peopleCount: Number(r.people_num.replace("명", "")),
            min_price: r.price.match(/¥([\d,]+)/)?.[1] || "",
            max_price: r.price.match(/~ ¥([\d,]+)/)?.[1] || "",
            text: r.writing,
            images: imageUrls,
          };
        });

        console.log("Mapped reviews:", mapped);
        activeTab === "store" ? setAllReviews(mapped) : setMyReviews(mapped);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      }
    };
    fetchReviews();
  }, [activeTab]);

  const reviews = activeTab === "store" ? allReviews : myReviews;
  const editText = activeTab === "store" ? null : "리뷰 수정하기";

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <TabMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          option1="전체리뷰"
          option2="마이리뷰"
        />
      </div>

      <ReviewContainer reviews={reviews} edit={editText} />

      <Nav
        home="/images/nav/home.png"
        map="/images/nav/map.png"
        review="/images/nav/review_red.png"
        reservation="/images/nav/reservation.png"
        profile="/images/nav/profile.png"
        homeColor="#747474"
        mapColor="#747474"
        reviewColor="#BB0038"
        reservationColor="#747474"
        profileColor="#747474"
      />
    </div>
  );
}
