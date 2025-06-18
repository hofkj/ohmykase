import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import axios from "axios";
import Restaurant from "./Restaurant";
import styles from "../../styles/home/restaurantSwiper.module.css";

export default function RestaurantSwiper({ shopList }) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // 북마크된 가게 id 불러오기
    axios
      .get(`/api/bookmark/user/${apiKey}`, {
        withCredentials: true,
      })
      .then((res) => {
        const ids = (res.data.bookmark_list || []).map((shop) => shop.id);
        setBookmarkedIds(ids);
      })
      .catch((err) => console.error("북마크 불러오기 실패:", err));
  }, []);

  return (
    <div className={styles.restaurant_swiper}>
      <Swiper
        slidesPerView={2.3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className={styles.swiper}
      >
        {shopList.map((shop) => (
          <SwiperSlide key={shop.id}>
            <Restaurant
              id={shop.id}
              name={shop.shop_name}
              rating={shop.rating}
              location={shop.area_name}
              initialBookmarked={bookmarkedIds.includes(shop.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
