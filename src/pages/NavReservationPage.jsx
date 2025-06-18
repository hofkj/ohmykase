import React, { useEffect, useState } from "react";
import styles from "../styles/pages/NavReservationPage.module.css";
import PageHeader from "../components/common/PageHeader";
import Nav from "../components/common/Nav";
import ReservationItem from "../components/reservation/ReservationItem";
import axios from "axios";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function NavReservationPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const [watingRes, okRes, finishedRes, cancelledRes] = await Promise.all([
        axios.get(
          `/api/reservation/status/wating/${apiKey}`,
          { withCredentials: true }
        ),
        axios.get(`/api/reservation/status/ok/${apiKey}`, {
          withCredentials: true,
        }),
        axios.get(
          `/api/reservation/status/finished/${apiKey}`,
          { withCredentials: true }
        ),
        axios.get(
          `/api/reservation/status/cancle/${apiKey}`,
          { withCredentials: true }
        ),
      ]);

      setUpcomingReservations([...watingRes.data, ...okRes.data]);
      setCompletedReservations(finishedRes.data);
      setCancelledReservations(cancelledRes.data);
    } catch (error) {
      console.error("예약 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const renderReservations = (list) =>
    list.length > 0 ? (
      list.map((item, idx) => <ReservationItem key={idx} {...item} />)
    ) : (
      <div className={styles.emptyText}>예약이 없습니다</div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <PageHeader text="예약" className={styles.pageHeader} />

        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              activeTab === "upcoming" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            예정된 예약
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "completed" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("completed")}
          >
            완료된 예약
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "cancelled" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("cancelled")}
          >
            취소된 예약
          </div>
        </div>
      </div>

      <div className={styles.reservationList}>
        {activeTab === "upcoming" && renderReservations(upcomingReservations)}
        {activeTab === "completed" && renderReservations(completedReservations)}
        {activeTab === "cancelled" && renderReservations(cancelledReservations)}
      </div>

      <Nav
        home="/images/nav/home.png"
        map="/images/nav/map.png"
        review="/images/nav/review.png"
        reservation="/images/nav/reservation_red.png"
        profile="/images/nav/profile.png"
        homeColor="#747474"
        mapColor="#747474"
        reviewColor="#747474"
        reservationColor="#BB0038"
        profileColor="#747474"
      />
    </div>
  );
}

export default NavReservationPage;
