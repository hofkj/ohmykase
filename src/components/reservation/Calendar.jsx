// src/components/reservation/Calendar.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/reservation/calendar.module.css";
import BottomButton from "../common/BottomButton";
import TimeSwiper from "./TimeSwiper";
import axios from "axios";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

const Calendar = ({ shopId }) => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [activeDate, setActiveDate] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [activeTime, setActiveTime] = useState(null);

  useEffect(() => {
    setCalendar(currentDate);
  }, [currentDate]);

  const setCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // 이전 달 tail
    const calendarDays = [];
    for (
      let i = prevMonthLastDate - firstDay + 1;
      i <= prevMonthLastDate;
      i++
    ) {
      calendarDays.push({ date: i, isOtherMonth: true });
    }
    // 이번 달
    for (let i = 1; i <= lastDate; i++) {
      calendarDays.push({ date: i, isOtherMonth: false });
    }
    // 다음 달 head
    while (calendarDays.length % 7 !== 0) {
      const nextDay = calendarDays.length % 7 + 1;
      calendarDays.push({ date: nextDay, isOtherMonth: true });
    }

    setDaysInMonth(calendarDays);
    setMonthName(`${year}년 ${month + 1}월`);
  };

  const changeMonth = (diff) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + diff);
    setCurrentDate(newDate);
    setActiveDate(null);
    setActiveTime(null);
  };

  const handleDateClick = (day) => {
    setActiveDate(day);
    setActiveTime(null);
  };

  const handleNumberClick = (num) => {
    setSelectedNumber(num);
  };

  const handleSubmit = async () => {
    if (!activeDate || !selectedNumber || !activeTime) {
      alert("날짜, 시간, 인원을 모두 선택해주세요.");
      return;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      activeDate
    ).padStart(2, "0")}`;

    try {
      const res = await axios.post(
        `/api/reservation/step1/${apiKey}/${shopId}`,
        {
          date: formattedDate,
          people_num: selectedNumber,
          time: activeTime,
        },
        { withCredentials: true }
      );
      const reservationId = res.data.reservation_id;
      navigate(`/ReservationPage`, { state: { reservationId } });
    } catch (err) {
      console.error("예약 실패:", err);
      alert("예약 저장에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <button
            className={styles.prevMonth}
            onClick={() => changeMonth(-1)}
          >
            <img src="../../images/icon/arrow_L.png" alt="이전 달" />
          </button>
          <div className={styles.title}>{monthName}</div>
          <button
            className={styles.nextMonth}
            onClick={() => changeMonth(1)}
          >
            <img src="../../images/icon/arrow_R.png" alt="다음 달" />
          </button>
        </div>

        <div className={styles.calendarContainer}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className={`${styles.item} ${styles.weekName}`}
            >
              {day}
            </div>
          ))}

          {daysInMonth.map((day, idx) => {
            const isActive = !day.isOtherMonth && activeDate === day.date;

            return (
              <div
                key={idx}
                className={`${styles.item} ${
                  day.isOtherMonth ? styles.otherMonth : ""
                }`}
                onClick={() => !day.isOtherMonth && handleDateClick(day.date)}
                style={{
                  backgroundColor: isActive ? "#BB0038" : undefined,
                  color: isActive ? "#FFF" : undefined,
                }}
              >
                {day.date}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.numberSelection}>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} onClick={() => handleNumberClick(num)}>
            <img
              src={`../../images/icon/${num}${
                selectedNumber === num ? "_red" : ""
              }.png`}
              className={styles.numImg}
              alt={`${num}명`}
            />
            <div
              className={styles.numText}
              style={{
                color: selectedNumber === num ? "#BB0038" : "#B3B3B3",
              }}
            >
              {num}명
            </div>
          </div>
        ))}
      </div>

      <TimeSwiper activeTime={activeTime} setActiveTime={setActiveTime} />
      <BottomButton text="확인" onClick={handleSubmit} />
    </div>
  );
};

export default Calendar;
