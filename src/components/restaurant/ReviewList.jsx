import React, { useState } from "react";
import styles from "../../styles/restaurant/reviewList.module.css";

export default function ReviewList({ reviews }) {
  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
}

function ReviewItem({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 80; // 최대 글자 수

  const getStarImage = (rating) => {
    const rounded = Math.round(rating * 2) / 2;
    return `/images/icon/star_${rounded}.png`;
  };

  return (
    <div className={styles.reviewItem}>
      <div className={styles.userContainer}>
        <img
          src={review.userProfile}
          alt="user profile"
          className={styles.userImage}
        />
        <div className={styles.userInfo}>
          <div className={styles.userName}>{review.username}</div>
          <div className={styles.timeAgo}>{review.timeAgo}</div>
        </div>
      </div>

      <div className={styles.rating}>
        <img src={getStarImage(review.rating)} alt="별점" />
        <div className={styles.ratingValue}>{review.rating}</div>
      </div>

      {review.images.length > 0 && (
        <div className={styles.reviewImages}>
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review ${index + 1}`}
              className={styles.reviewImage}
            />
          ))}
        </div>
      )}

      <p className={styles.reviewText}>
        {review.text.length > MAX_LENGTH
          ? isExpanded
            ? review.text
            : `${review.text.substring(0, MAX_LENGTH)}... `
          : review.text}
        {review.text.length > MAX_LENGTH && (
          <button
            className={styles.moreButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "닫기" : "더보기"}
          </button>
        )}
      </p>
    </div>
  );
}
