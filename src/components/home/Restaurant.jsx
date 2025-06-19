import React, { useState } from "react";
import styles from "../../styles/home/restaurant.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Restaurant({
  id,
  name,
  rating,
  location,
  shop_banner_image,  
  initialBookmarked = false,
  deletable = false,
  onDelete,
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const navigate = useNavigate();
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
  // const API_URL = import.meta.env.VITE_API_URL;

  const toggleBookmark = async (e) => {
    e.stopPropagation();

    try {
      if (isBookmarked) {
        await axios.delete(`/api/bookmark/delete/${apiKey}/${id}`, {
          withCredentials: true,
        });
        setIsBookmarked(false);
        if (deletable && onDelete) onDelete(id);
      } else {
        await axios.post(
          `/api/bookmark/add/${apiKey}/${id}`,
          {},
          { withCredentials: true }
        );
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("북마크 처리 중 오류:", err);
    }
  };

  const handleClick = () => {
    navigate(`/RestaurantPage/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.restaurant_container} onClick={handleClick}>
      <div className={styles.restaurant_img}>
        <img
          src={`/uploads/shop/${shop_banner_image}`}
          alt="restaurant"
          onError={(e) => {
            e.target.src = "/images/restaurant/restaurant.png";
          }} // 에러시 기본 이미지
        />
      </div>

      <div className={styles.restaurant_details}>
        <div className={styles.restaurant_name}>
          <div className={styles.name}>{name}</div>
          <img
            src={
              isBookmarked
                ? "/images/icon/bookmark_red.png"
                : "/images/icon/bookmark.png"
            }
            alt="bookmark"
            className={styles.bookmark}
            onClick={toggleBookmark}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.restaurant_info}>
          <div className={styles.rating}>
            <img
              src="/images/icon/star.png"
              alt="star"
              className={styles.star}
            />
            <div className={styles.rating_value}>{rating}</div>
          </div>
          <div className={styles.location}>{location}</div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
