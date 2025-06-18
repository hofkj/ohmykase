import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../styles/pages/SignupPage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import Progress from "../components/common/Progress";
import BottomButton from "../components/common/BottomButton";

// const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleArrowClick = () => {
    navigate("/LoginPage");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/user/join/${API_KEY}`,
        {
          name: name,
          nickname: nickname,
          password: password,
          password_ck: confirmPassword,
        },
        { withCredentials: true }
      );
      alert("회원가입 성공!");
      navigate("/LoginPage");
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      alert("회원가입 실패. 입력을 다시 확인해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <TitleHeaderBar title="회원가입" onArrowClick={handleArrowClick} />
      <Progress imgSrc="/images/icon/progress.png" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.InputContainer}>
          <div className={styles.title}>이름을 입력해주세요</div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.InputContainer}>
          <div className={styles.title}>아이디를 입력해주세요</div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="아이디"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.InputContainer}>
          <div className={styles.title}>비밀번호</div>
          <div className={styles.input}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="영문+숫자+특수문자 8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
            >
              <img
                src={
                  showPassword
                    ? "/images/icon/eye-open.png"
                    : "/images/icon/eye-closed.png"
                }
                alt="비밀번호 보기"
              />
            </button>
          </div>
        </div>

        <div className={styles.InputContainer}>
          <div className={styles.title}>비밀번호 확인</div>
          <div className={styles.input}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={toggleConfirmPasswordVisibility}
            >
              <img
                src={
                  showConfirmPassword
                    ? "/images/icon/eye-open.png"
                    : "/images/icon/eye-closed.png"
                }
                alt="비밀번호 보기"
              />
            </button>
          </div>
        </div>

        <div className={styles.submitButton}>
          <button type="submit" className={styles.btn}>
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
