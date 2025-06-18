import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/review/ReviewContainer.module.css";

export default function ReviewContainer({ reviews, edit }) {
  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <ReviewItem key={review.reviewId} review={review} edit={edit} />
      ))}
    </div>
  );
}

function ReviewItem({ review, edit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 80;

  const getStarImage = (rating) => {
    const rounded = Math.round(rating * 2) / 2; 
    return `/images/icon/star_${rounded}.png`;
  };

  return (
    <div className={styles.reviewItem}>
      <div className={styles.user}>
        <div className={styles.userContainer}>
          <img
            src={review.userProfile}
            alt="user profile"
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <div className={styles.userName}>{review.username}</div>
            <div className={styles.timeAgo}>
              {review.restaurantName} • {review.timeAgo}
            </div>
          </div>
        </div>
        {edit && (
          <Link to={`/edit-review/${review.reservationId}`} state={{ review }}>
            <div className={styles.editButton}>{edit}</div>
          </Link>
        )}
      </div>

      <div>
        <div className={styles.rating}>
          <img src={getStarImage(review.rating)} alt="rating" />
          <div className={styles.ratingValue}>{review.rating}</div>
        </div>
        <div className={styles.priceContainer}>
          {review.peopleCount}명 | ¥ {review.min_price} ~ ¥ {review.max_price}
        </div>
      </div>

      {review.images.length > 0 && (
        <div className={styles.reviewImages}>
          {review.images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Review ${idx + 1}`}
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
