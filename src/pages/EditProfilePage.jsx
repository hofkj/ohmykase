import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../styles/pages/EditProfilePage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import InputContainer from "../components/common/InputContainer";
import AllergyInput from "../components/common/AllergyInput";
import BottomButton from "../components/common/BottomButton";
// const API_URL = import.meta.env.VITE_API_URL;

function EditProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [allergyList, setAllergyList] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";

 useEffect(() => {
  axios
    .get(`/api/user/info/${apiKey}`, {
      withCredentials: true,
    })
    .then((res) => {
      setName(res.data.user_name);
      setNickname(res.data.user_nickname);

      let allergies = [];
      if (res.data.user_allergy) {
        try {
          allergies = JSON.parse(res.data.user_allergy).map((item) =>
            item.trim().replace(/^"|"$/g, "")
          );
        } catch (e) {
          allergies = res.data.user_allergy
            .replace(/[\[\]"]+/g, "") 
            .split(",")
            .map((item) => item.trim());
        }
      }

      setAllergyList(allergies);
    })
    .catch((err) => {
      console.error("회원 정보 조회 실패:", err);
    });
}, []);


  const handleSubmit = async () => {
    try {
      await axios.patch(
        `/api/user/update/${apiKey}`,
        {
          name,
          nickname,
          allergy: allergyList.join(","),
        },
        {
          withCredentials: true,
        }
      );
      alert("회원정보가 수정되었습니다!");
      navigate("/MyPage");
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert("회원 정보 수정에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `/api/user/logout/${apiKey}`,
        {},
        { withCredentials: true }
      );
      alert("로그아웃되었습니다");
      setShowLogoutModal(false);
      navigate("/LoginPage");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`/api/user/delete/${apiKey}`, {
        withCredentials: true,
      });
      alert("회원 탈퇴되었습니다");
      setShowDeleteModal(false);
      navigate("/LoginPage");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar
        title="프로필 수정"
        onArrowClick={() => navigate("/MyPage")}
      />

      <div className={styles.inputContainer}>
        <InputContainer
          title="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputContainer
          title="아이디"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <AllergyInput
          title="알레르기 및 불호음식"
          allergyList={allergyList}
          setAllergyList={setAllergyList}
        />
      </div>

      <div className={styles.actionButtonWrapper}>
        <button
          className={styles.grayButton}
          onClick={() => setShowLogoutModal(true)}
        >
          로그아웃
        </button>
        <button
          className={styles.redButton}
          onClick={() => setShowDeleteModal(true)}
        >
          회원탈퇴
        </button>
      </div>

      <BottomButton text="확인" onClick={handleSubmit} />

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>🚨</p>
            <p>로그아웃 하시겠습니까?</p>
            <span>
              로그아웃 시 예약한 식당에 대한 정보를
              <br /> 받지 못하게 됩니다.
            </span>
            <div className={styles.modalButtonGroup}>
              <button className={styles.redButton} onClick={handleLogout}>
                로그아웃하기
              </button>
              <button
                className={styles.grayButton}
                style={{
                  backgroundColor: "#fff",
                  border: "0.7px solid #C1C1C1",
                }}
                onClick={() => setShowLogoutModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>🚨 가입하신 계정을 탈퇴하시겠습니까?</p>
            <span>
              탈퇴 시 예약 정보들이 사라지게 되며,
              <br />
              모든 데이터는 복구가 불가능합니다.
            </span>
            <div className={styles.modalButtonGroup}>
              <button
                className={styles.redButton}
                onClick={handleDeleteAccount}
              >
                탈퇴하기
              </button>
              <button
                className={styles.grayButton}
                onClick={() => setShowDeleteModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfilePage;
