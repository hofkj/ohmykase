import React, { useEffect, useState } from "react";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import Progress from "../components/common/Progress";
import ReservationInfo from "../components/common/ReservationInfo";
import AllergyInput from "../components/common/AllergyInput";
import TwoBottomButton from "../components/common/TwoBottomButton";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/pages/reservationUserInfoPage.module.css";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function ReservationUserInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = location.state?.reservationId;
  const userId = location.state?.userId; 

  const [peopleNum, setPeopleNum] = useState(0);
  const [allergyLists, setAllergyLists] = useState([]);

  // 인원수 세팅
  useEffect(() => {
    if (!reservationId) return;
    axios
      .get(`/api/reservation/info/${apiKey}/${reservationId}`)
      .then((res) => {
        const { people_num } = res.data;
        const number = parseInt(people_num.replace("명", ""));
        setPeopleNum(number);
        setAllergyLists(Array(number).fill([]));
      });
  }, [reservationId]);

  // userId로 알레르기 정보 불러와서 첫 번째 칸에 자동 세팅
  useEffect(() => {
    if (!userId || peopleNum === 0) return;
    axios
      .get(`/api/reservation/user_info/${apiKey}/${userId}`,
        { withCredentials: true })
      .then((res) => {
        let allergy = res.data;
        let parsed = [];
        try {
          parsed = Array.isArray(allergy) ? allergy : JSON.parse(allergy);
        } catch {
          parsed = allergy.replace(/[\[\]"]/g, "").split(",").map((item) => item.trim());
        }
        setAllergyLists((prev) => {
          // 기존 값을 유지하면서 첫 번째만 갱신
          const copy = [...prev];
          copy[0] = parsed;
          return copy;
        });
      });
  }, [userId, peopleNum]);

  const handleArrowClick = () => {
    navigate("/ReservationPage");
  };

  const handleNextClick = async () => {
    const formatted = allergyLists
      .map((list) => `[${list.join(", ")}]`)
      .join("");

    try {
      await axios.post(
        `/api/reservation/step3/${apiKey}/${reservationId}`,
        { input_allergy: formatted },
        { withCredentials: true }
      );
      navigate("/CompletionPage");
    } catch (err) {
      console.error("알레르기 정보 저장 실패:", err);
      alert("알레르기 정보를 저장하는 데 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="예약하기" onArrowClick={handleArrowClick} />
      <div className={styles.info}>
        <Progress imgSrc="/images/icon/progress_red.png" />
        <ReservationInfo reservationId={reservationId} />
      </div>
      <div className={styles.inputContainer}>
        {Array.from({ length: peopleNum }).map((_, index) => (
          <AllergyInput
            key={index}
            title={`예약자 ${index + 1}의 알레르기 및 불호 음식`}
            allergyList={allergyLists[index] || []}
            setAllergyList={(newList) => {
              setAllergyLists((prev) => {
                const copy = [...prev];
                copy[index] = newList;
                return copy;
              });
            }}
          />
        ))}
      </div>
      <TwoBottomButton
        back="이전"
        next="다음"
        navigateToBack="/ReservationPage"
        onNextClick={handleNextClick}
        backState={{ reservationId, userId }}
      />
    </div>
  );
}

export default ReservationUserInfoPage;
