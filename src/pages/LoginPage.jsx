import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/pages/LoginPage.module.css";

// const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function LoginPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    if (!nickname || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/user/login/${API_KEY}`,
        {
          nickname: nickname,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      alert(
        error.response?.data?.error ||
          "로그인 실패. 아이디 또는 비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          src="/images/icon/logo.png"
          alt="Oh! my Kase"
          className={styles.logo}
        />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>아이디</label>
          <input
            type="text"
            className={styles.input}
            placeholder="아이디를 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="비밀번호를 입력해주세요"
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

        <div className={styles.forgotPasswordContainer}>
          <button className={styles.forgotPasswordButton}>아이디 찾기</button>
          <span className={styles.divider}>|</span>
          <button className={styles.forgotPasswordButton}>비밀번호 찾기</button>
        </div>

        <div className={styles.signupContainer}>
          <div className={styles.signupText}>
            <img src="/images/icon/logo.png" className={styles.brandLogo} />
            <span> 가 처음이라면?</span>
          </div>
          <Link to="/SignupPage" className={styles.signupLink}>
            <span>회원가입 하러 가기</span>
            <img
              src="/images/icon/arrow_red.png"
              className={styles.arrowIcon}
            />
          </Link>
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
