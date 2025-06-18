import React from "react";
import styles from "../../styles/reservation/ReservationItem.module.css";

function ReservationItem({ status, shop_name, info, price }) {
  const statusClass =
    status === "진행 중"
      ? styles.pending
      : status === "예약 확정"
      ? styles.confirmed
      : status === "완료"
      ? styles.completed
      : styles.cancelled;

  return (
    <div className={styles.reservationItemContainer}>
      <img src="/images/restaurant/interior3.png" className={styles.restaurantImage} />
      <div className={styles.detailsContainer}>
        <div className={`${styles.status} ${statusClass}`}>{status}</div>
        <div className={styles.restaurantName}>{shop_name}</div>
        <div className={styles.reservationDetails}>
          <div className={styles.reservationDate}>{info}</div>
          <div className={styles.reservationPrice}>{price}</div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
