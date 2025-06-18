import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import TitleHeaderBar from "../components/common/TitleHeaderBar";
import ReservationInfo from "../components/common/ReservationInfo";
import InputContainer from "../components/common/InputContainer";
import BottomButton from "../components/common/BottomButton";
import Progress from "../components/common/Progress";
import PriceRangeInput from "../components/reservation/PriceRangeInput";
import FoodAmountSelector from "../components/reservation/FoodAmountSelector";

import styles from "../styles/pages/ReservationPage.module.css";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = location.state?.reservationId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [foodAmount, setFoodAmount] = useState("");

  const handleArrowClick = () => {
    navigate("/RestaurantPage");
  };

 const handleSubmit = async () => {
  if (!name || !email || !minPrice || !maxPrice || !foodAmount) {
    alert("모든 값을 입력해주세요.");
    return;
  }

  try {
    const response = await axios.post(
      `/api/reservation/step2/${apiKey}/${reservationId}`,
      {
        name,
        mail: email,
        min_price: minPrice,
        max_price: maxPrice,
        food_amount: foodAmount,
      },
      { withCredentials: true }
    );

    const userId = response.data?.user_id; 

    if (!userId) {
      alert("유저 정보 로딩 실패");
      return;
    }

    navigate("/ReservationUserInfoPage", {
      state: {
        reservationId,
        userId, 
      },
    });
  } catch (err) {
    console.error("예약 정보 저장 실패:", err);
    alert("예약 정보 저장에 실패했습니다.");
  }
};


  return (
    <div className={styles.container}>
      <TitleHeaderBar title="예약하기" onArrowClick={handleArrowClick} />
      <div className={styles.info}>
        <Progress imgSrc="/images/icon/progress.png" />
        <ReservationInfo reservationId={reservationId} />
      </div>

      <div className={styles.inputContainer}>
        <InputContainer
          title="예약자 본인의 이름을 적어주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputContainer
          title="이메일을 적어주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PriceRangeInput
          label="원하는 가격대의 범위를 설정해주세요"
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <FoodAmountSelector
          label="원하는 음식의 양을 설정해주세요"
          value={foodAmount}
          setValue={setFoodAmount}
        />
      </div>

      <BottomButton text="다음" onClick={handleSubmit} />
    </div>
  );
}

export default ReservationPage;
