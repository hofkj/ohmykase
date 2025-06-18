import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/PasswordPage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import Progress from "../components/common/Progress";
import TwoBottomButton from "../components/common/TwoBottomButton";

function PasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleArrowClick = () => {
    navigate("/LoginPage");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="회원가입" onArrowClick={handleArrowClick} />
      <Progress imgSrc="/images/icon/progress_red.png" />
      <form className={styles.form}>
        <div className={styles.InputContainer}>
          <div className={styles.title}>비밀번호</div>
          <div className={styles.input}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="대문자와 소문자, 특수문자 포함 8자 이상"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <img src="/images/icon/eye-open.png" alt="비밀번호 숨기기" />
              ) : (
                <img src="/images/icon/eye-closed.png" alt="비밀번호 보기" />
              )}
            </button>
          </div>
        </div>

        <div className={styles.InputContainer}>
          <div className={styles.title}>비밀번호 확인</div>
          <div className={styles.input}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="위에서 작성한 비밀번호를 다시 작성해주세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <img src="/images/icon/eye-open.png" alt="비밀번호 숨기기" />
              ) : (
                <img src="/images/icon/eye-closed.png" alt="비밀번호 보기" />
              )}
            </button>
          </div>
        </div>
      </form>
      <TwoBottomButton
        back="이전"
        next="다음"
        navigateToBack="/SignupPage"
        navigateToNext="/" 
      />
    </div>
  );
}

export default PasswordPage;
