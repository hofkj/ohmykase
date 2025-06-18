import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import RestaurantImage from "../components/restaurant/RestaurantImage";
import RestaurantInfo from "../components/restaurant/RestaurantInfo";
import TagList from "../components/restaurant/TagList";
import TabMenu from "../components/common/TabMenu";
import StoreInfo from "../components/restaurant/StoreInfo";
import ImageGallery from "../components/restaurant/ImageGallery";
import ReviewList from "../components/restaurant/ReviewList";
import BottomBar from "../components/restaurant/BottomBar";
import Calendar from "../components/reservation/Calendar";

import styles from "../styles/pages/restaurantPage.module.css";
// const API_URL = import.meta.env.VITE_API_URL;


export default function RestaurantPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("store");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";

  // 1) 가게 정보 불러오기
  useEffect(() => {
    axios
      .get(`/api/shop/${apiKey}/${id}`, { withCredentials: true })
      .then((res) => {
        const shop = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!shop) throw new Error("Shop not found");
        const tags = shop.tag_names ? shop.tag_names.split(",") : [];
        setRestaurantData({ ...shop, tags });
      })
      .catch((err) => {
        console.error("레스토랑 정보 불러오기 실패:", err);
        navigate("/");
      });
  }, [id, navigate]);

  // 2) 리뷰 탭으로 전환될 때만 호출
  useEffect(() => {
    if (activeTab === "review" && reviews.length === 0) {
      axios
        .get(`/api/shop/reviews/${apiKey}/${id}`, { withCredentials: true })
        .then((res) => {
          console.log("리뷰 API 응답:", res.data);
          const list = res.data.map((r) => ({
            username: r.user,
            userProfile: r.user_profile || "/images/restaurant/profile_img.png",
            rating: r.rating,
            timeAgo: r.date,
            text: r.writing,
            images: r.images
              ? Array.isArray(r.images)
                ? r.images
                : r.images.split(",")
              : [],
          }));
          setReviews(list);
        })
        .catch((err) => {
          console.error("리뷰 불러오기 실패:", err);
        });
    }
  }, [activeTab, id, reviews.length]);

  if (!restaurantData) {
    return <div className={styles.notFound}>식당 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.restaurantDetail}>
      <RestaurantImage
        imageUrl={
          restaurantData.shop_images
            ? restaurantData.shop_images.split(",")[0]
            : "/images/restaurant/restaurant.png"
        }
      />

      <RestaurantInfo
        name={restaurantData.shop_name}
        rating={restaurantData.rating}
        description={restaurantData.shop_word || ""}
      />

      <TagList tags={restaurantData.tags || []} />

      <TabMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        option1="가게"
        option2="리뷰"
      />

      {activeTab === "store" ? (
        <>
          <StoreInfo
            address={restaurantData.shop_location}
            mapLink={restaurantData.shop_location_path}
            time="운영 시간 보기"
            phone={restaurantData.shop_telnum}
            shopTime={restaurantData.shop_time}
            shopId={restaurantData.id}
          />
          <ImageGallery
            images={
              restaurantData.shop_images
                ? restaurantData.shop_images.split(",")
                : ["/images/restaurant/restaurant.png"]
            }
          />
        </>
      ) : (
        <ReviewList reviews={reviews} />
      )}

      <BottomBar onClickReserve={() => setShowCalendar(true)} shopId={restaurantData.id} />

      {(showCalendar || isAnimating) && (
        <div
          className={`${styles.calendarWrapper} ${
            showCalendar ? styles.show : styles.hide
          }`}
          onAnimationEnd={() => {
            if (!showCalendar) setIsAnimating(false);
          }}
        >
          <div
            className={styles.calendarOverlay}
            onClick={() => {
              setIsAnimating(true);
              setShowCalendar(false);
            }}
          />
          <div className={styles.calendarContent}>
            <Calendar shopId={restaurantData.id} />
          </div>
        </div>
      )}
    </div>
  );
}
