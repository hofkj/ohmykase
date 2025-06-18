import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/restaurant/bottombar.module.css";

export default function BottomBar({ onClickReserve, shopId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!shopId) return;

    // 1. 북마크 수 가져오기
    axios
      .get(`/api/bookmark/shop/${apiKey}/${shopId}`,
        { withCredentials: true })
      .then((res) => setBookmarkCount(res.data.bookmark_sum))
      .catch((err) => console.error("북마크 수 불러오기 실패:", err));

    // 2. 현재 유저의 북마크 목록 확인 (이 가게가 북마크 되어 있는지)
    axios
      .get(`/api/bookmark/user/${apiKey}`,
        { withCredentials: true })
      .then((res) => {
        const list = res.data.bookmark_list || [];
        const found = list.find((shop) => shop.id === shopId);
        setIsBookmarked(!!found);
      })
      .catch((err) => console.error("북마크 여부 확인 실패:", err));
  }, [shopId]);

  const toggleBookmark = async () => {
    if (!shopId) return;

    try {
      if (isBookmarked) {
        // 북마크 삭제
        await axios.delete(
          `/api/bookmark/delete/${apiKey}/${shopId}`,
        { withCredentials: true }
        );
        setBookmarkCount((prev) => Math.max(prev - 1, 0));
      } else {
        // 북마크 추가
        await axios.post(`/api/bookmark/add/${apiKey}/${shopId}`,
        { withCredentials: true });
        setBookmarkCount((prev) => prev + 1);
      }

      setIsBookmarked((prev) => !prev);
    } catch (err) {
      console.error("북마크 처리 실패:", err);
    }
  };

  return (
    <div className={styles.bottombar_container}>
      <div>
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
        <div className={styles.bookmarkNum}>{bookmarkCount}</div>
      </div>

      <button className={styles.reservation_button} onClick={onClickReserve}>
        예약하기
      </button>
    </div>
  );
}
