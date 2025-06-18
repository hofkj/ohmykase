import React, { useState, useEffect } from "react";
import styles from "../../styles/restaurant/storeInfo.module.css";
import { Link } from "react-router-dom";

export default function StoreInfo({
  address,
  mapLink,
  time,
  phone,
  shopTime,
  shopId,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setShowContent(true);
    } else {
      setTimeout(() => setShowContent(false), 300);
    }
  }, [isExpanded]);

  return (
    <div className={styles.storeInfo}>
      <div className={styles.storeRow}>
        <span className={styles.map}>
          <img src="/images/icon/map.png" alt="map" />
        </span>
        <span className={styles.address}>{address}</span>
        <Link
          to="/MapPage"
          state={{ mapSrc: mapLink, shopId }} 
          style={{ textDecoration: "none" }}
        >
          <div className={styles.mapLink}>지도 보기</div>
        </Link>
      </div>

      <div
        className={styles.storeRow}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.time_img}>
          <img src="/images/icon/time.png" alt="clock" />
        </span>
        <span className={styles.time}>
          {time} <span className={styles.toggle}>{isExpanded ? "▲" : "▼"}</span>
        </span>
      </div>

      <div
        className={`${styles.expandedTime} ${isExpanded ? styles.open : ""}`}
        style={{
          maxHeight: isExpanded ? "300px" : "0",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        {showContent &&
          shopTime &&
          Object.entries(shopTime).map(([day, hours]) => (
            <div key={day}>
              {day} {hours}
            </div>
          ))}
      </div>

      <div className={styles.storeRow}>
        <span className={styles.tel}>
          <img src="/images/icon/tel.png" alt="전화" />
        </span>
        <span className={styles.phone}>{phone}</span>
      </div>
    </div>
  );
}
