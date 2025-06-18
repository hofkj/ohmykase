import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import axios from "axios";
import Restaurant from "../home/Restaurant";
import styles from "../../styles/home/restaurantSwiper.module.css";

export default function BookmarkSwiper() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`/api/bookmark/user/${apiKey}`, {
        withCredentials: true,
      })
      .then((res) => {
        const list = res.data.bookmark_list || [];
        setBookmarkList(list);
      })
      .catch((err) => {
        console.error("북마크 목록 불러오기 실패:", err);
      });
  }, []);

  const handleDelete = (deletedId) => {
    setBookmarkList((prev) => prev.filter((item) => item.id !== deletedId));
  };

  return (
    <div className={styles.restaurant_swiper}>
      <Swiper
        slidesPerView={2.3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className={styles.swiper}
      >
        {bookmarkList.map((shop) => (
          <SwiperSlide key={shop.id}>
            <Restaurant
              id={shop.id}
              name={shop.shop_name}
              rating={shop.rating}
              location={shop.area_name}
              initialBookmarked={true}
              deletable={true}
              onDelete={handleDelete}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
