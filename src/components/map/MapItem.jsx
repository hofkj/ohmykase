import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/map/mapItem.module.css";
import axios from "axios";

function MapItem({ shopId }) {
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (shopId) {
      // 단일 가게 정보 불러오기
      axios
        .get(`/api/shop/${apiKey}/${shopId}`,
        { withCredentials: true })
        .then((res) => {
          const shopData = res.data[0];
          shopData.shop_images = shopData.shop_images?.split(",") || [];
          setShops([shopData]);
        })
        .catch((err) => console.error("가게 정보 불러오기 실패:", err));
    } else {
      // 북마크된 가게 목록 불러오기
      axios
        .get(`/api/bookmark/user/${apiKey}`, {
          withCredentials: true,
        })
        .then((res) => {
          const bookmarkList = res.data.bookmark_list || [];
          const parsedList = bookmarkList.map((shop) => ({
            ...shop,
            shop_images: shop.shop_images?.split(",") || [],
          }));
          setShops(parsedList);
        })
        .catch((err) => console.error("북마크 불러오기 실패:", err));
    }
  }, [shopId]);

  const handleClick = (id) => {
    navigate(`/RestaurantPage/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (shops.length === 0) {
    return <div>가게 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.container}>
      {shops.map((shop, index) => (
        <div
          className={styles.infoContainer}
          key={index}
          onClick={() => handleClick(shop.id)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurantName}>
              <div>{shop.shop_name}</div>
              <img
                src="/images/icon/star_red.png"
                alt="Star"
                className={styles.starIcon}
              />
              <div className={styles.rating}>{shop.rating}</div>
            </div>
            <div className={styles.bookmarkIcon}>
              <img src="/images/icon/bookmark_red.png" alt="Bookmark" />
            </div>
          </div>
          <div className={styles.address}>{shop.area_name}</div>

          <div className={styles.imageContainer}>
            {shop.shop_images.length > 0 ? (
              shop.shop_images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Shop ${i + 1}`}
                  className={styles.restaurantImage}
                />
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`/images/restaurant/sushi${i}.png`}
                  alt={`기본 이미지 ${i}`}
                  className={styles.restaurantImage}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapItem;