import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/common/reservationInfo.module.css";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function ReservationInfo({ reservationId }) {
  const [infoText, setInfoText] = useState("예약 정보를 불러오는 중입니다...");

useEffect(() => {
  console.log("넘어온 reservationId:", reservationId);
  if (!reservationId) return;

    axios
      .get(`/api/reservation/info/${apiKey}/${reservationId}`,
        { withCredentials: true })
      .then((res) => {
        const { date, time, people_num } = res.data;
        const text = `${date} | ${time} | ${people_num}`;
        setInfoText(text);
      })
      .catch((err) => {
        console.error("예약 정보 불러오기 실패:", err);
        setInfoText("예약 정보를 불러오지 못했습니다.");
      });
  }, [reservationId]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>예약 정보</div>
      <div className={styles.date}>{infoText}</div>
    </div>
  );
}

export default ReservationInfo;
