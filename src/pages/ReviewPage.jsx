import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/pages/ReviewPage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import BottomButton from "../components/common/BottomButton";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = new URLSearchParams(location.search).get("id");

  const [reviewInfo, setReviewInfo] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [serviceRating, setServiceRating] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleArrowClick = () => {
    navigate("/MyPage");
  };

  useEffect(() => {
    const fetchReviewInfo = async () => {
      try {
        const res = await axios.get(
          `/api/review/chose_write/${apiKey}/${reservationId}`,
          { withCredentials: true }
        );
        setReviewInfo(res.data);
      } catch (err) {
        console.log("리뷰 정보 불러오기 실패", err);
      }
    };

    fetchReviewInfo();
  }, [reservationId]);

  const handleImageAdd = () => {
    if (images.length < 4) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];

    files.forEach((file) => {
      if (newImages.length < 4) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          setImages([...newImages]);
        };
        reader.readAsDataURL(file);
      }
    });

    e.target.value = "";
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleServiceRating = (value) => {
    setServiceRating(value);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        rating,
        image: images.join(", "),
        writing: reviewText,
      };

      const res = await axios.post(
        `/api/review/write/${apiKey}/${reservationId}`,
        reviewData
      );

      alert(res.data.message);
      navigate("/NavReviewPage");
    } catch (err) {
      console.log("리뷰 제출 실패", err);
    }
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="리뷰 작성" onArrowClick={handleArrowClick} />

      <div className={styles.scrollContainer}>
        {reviewInfo && (
          <>
            <div className={styles.restaurantInfo}>
              <img
                src="/images/restaurant/interior3.png"
                alt="Restaurant"
                className={styles.restaurantImage}
              />
              <div className={styles.infoContainer}>
                <div className={styles.reservationDetails}>
                  {reviewInfo.info}
                </div>
                <div className={styles.restaurantName}>
                  {reviewInfo.shop_name}
                </div>
                <div className={styles.priceRange}>{reviewInfo.price}</div>
              </div>
            </div>

            <div className={styles.ratingContainer}>
              <div>전체적인 평점을 남겨주세요</div>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <img
                    key={value}
                    src={
                      value <= rating
                        ? "/images/icon/star.png"
                        : "/images/icon/star_gray.png"
                    }
                    alt="Star"
                    className={styles.starIcon}
                    onClick={() => handleRatingClick(value)}
                  />
                ))}
                <span className={styles.ratingValue}>{rating}</span>
              </div>
            </div>

            <div className={styles.serviceRating}>
              <div>제공된 서비스는 만족스러우셨나요?</div>
              <div className={styles.serviceOptions}>
                <button
                  className={`${styles.button} ${
                    serviceRating === "불만족" ? styles.selected : ""
                  }`}
                  onClick={() => handleServiceRating("불만족")}
                >
                  불만족
                </button>
                <button
                  className={`${styles.button} ${
                    serviceRating === "보통" ? styles.selected : ""
                  }`}
                  onClick={() => handleServiceRating("보통")}
                >
                  보통
                </button>
                <button
                  className={`${styles.button} ${
                    serviceRating === "만족" ? styles.selected : ""
                  }`}
                  onClick={() => handleServiceRating("만족")}
                >
                  만족
                </button>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div className={styles.imageGrid}>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className={styles.imageBox}>
                    {images[index] ? (
                      <img
                        src={images[index]}
                        alt={`uploaded-${index}`}
                        className={styles.imageThumbnail}
                      />
                    ) : index === images.length ? (
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

            <div className={styles.reviewTextContainer}>
              <textarea
                value={reviewText}
                onChange={handleReviewTextChange}
                placeholder="리뷰를 작성해주세요. (최대 300자 작성 가능)"
                maxLength="300"
                className={styles.reviewTextArea}
              />
            </div>
          </>
        )}
      </div>

      <BottomButton text="업로드" onClick={handleSubmitReview} />
    </div>
  );
}

export default ReviewPage;
