// src/pages/EditReviewPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../styles/pages/ReviewPage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import BottomButton from "../components/common/BottomButton";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

export default function EditReviewPage() {
  const { reservationId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // 넘어온 기존 리뷰 데이터
  const initReview = state?.review || {};

  // 폼 상태
  const [rating, setRating] = useState(initReview.rating || 0);
  const [reviewText, setReviewText] = useState(initReview.text || "");
  const [images, setImages] = useState(initReview.images || []);
  const [reservationInfo, setReservationInfo] = useState({
    shop_name: "",
    info: "",
    price: "",
  });
  const fileInputRef = useRef(null);

  // 예약 정보 불러오기
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await axios.get(
          `/api/review/chose_write/${apiKey}/${reservationId}`,
          { withCredentials: true }
        );
        setReservationInfo(res.data);
      } catch (err) {
        console.error("예약 정보 조회 실패:", err);
      }
    };
    fetchReservation();
  }, [reservationId]);

  const handleImageAdd = () => {
    if (images.length < 4) fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = [...images];
    files.forEach((file) => {
      if (newImgs.length < 4) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImgs.push(reader.result);
          setImages([...newImgs]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  };
  const handleSubmit = async () => {
    try {
      await axios.patch(
        `/api/review/edit/${apiKey}/${initReview.reviewId}`,
        {
          rating,
          writing: reviewText,
          image: images,
        },
        { withCredentials: true }
      );
      navigate(-1); // 한 단계 뒤로
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="리뷰 수정" onArrowClick={() => navigate(-1)} />

      <div className={styles.scrollContainer}>
        {/* 예약 정보 */}
        <div className={styles.restaurantInfo}>
          <img
            src="/images/restaurant/interior3.png"
            alt="Restaurant"
            className={styles.restaurantImage}
          />
          <div className={styles.infoContainer}>
            <div className={styles.reservationDetails}>
              {reservationInfo.info}
            </div>
            <div className={styles.restaurantName}>
              {reservationInfo.shop_name}
            </div>
            <div className={styles.priceRange}>
              {reservationInfo.price}
            </div>
          </div>
        </div>

        {/* 평점 */}
        <div className={styles.ratingContainer}>
          <div>전체적인 평점을 남겨주세요</div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((v) => (
              <img
                key={v}
                src={
                  v <= rating
                    ? "/images/icon/star.png"
                    : "/images/icon/star_gray.png"
                }
                alt="Star"
                className={styles.starIcon}
                onClick={() => setRating(v)}
              />
            ))}
            <span className={styles.ratingValue}>{rating}</span>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className={styles.imageContainer}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className={styles.imageGrid}>
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className={styles.imageBox}>
                {images[idx] ? (
                  <img
                    src={images[idx]}
                    alt={`uploaded-${idx}`}
                    className={styles.imageThumbnail}
                  />
                ) : idx === images.length ? (
                  <button
                    className={styles.addImageButton}
                    onClick={handleImageAdd}
                  >
                    <span className={styles.plus}>+</span>사진 추가하기
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <p className={styles.caption}>*사진 4장 업로드 가능</p>
        </div>

        {/* 리뷰 작성 */}
        <div className={styles.reviewTextContainer}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="리뷰를 수정해주세요. (최대 300자)"
            maxLength="300"
            className={styles.reviewTextArea}
          />
        </div>
      </div>

      {/* 수정 완료 버튼 */}
      <BottomButton text="수정 완료" onClick={handleSubmit} />
    </div>
  );
}
