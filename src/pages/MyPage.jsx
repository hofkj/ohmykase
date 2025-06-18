import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/pages/MyPage.module.css";
import PageHeader from "../components/common/PageHeader";
import Nav from "../components/common/Nav";
import { Link, useNavigate } from "react-router-dom";
import BookmarkSwiper from "../components/my/BookmarkSwiper";

const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    user_name: "",
    user_nickname: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviewInfo, setReviewInfo] = useState(null);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `/api/user/info/${apiKey}`,
          { withCredentials: true }
        );

        if (res.data) {
          setUserInfo(res.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("회원 정보 불러오기 실패", err);
        setIsLoggedIn(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 리뷰 작성 가능 정보 불러오기
  useEffect(() => {
    const fetchReviewInfo = async () => {
      try {
        const res = await axios.get(
          `/api/review/can_write/${apiKey}`,
          { withCredentials: true }
        );
        setReviewInfo(res.data);
      } catch (err) {
        console.log("작성 가능한 리뷰 없음 또는 에러", err);
      }
    };

    fetchReviewInfo();
  }, []);

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginClick = () => {
    navigate("/LoginPage");
  };

  return (
    <div className={styles.container}>
      <PageHeader text="마이페이지" />

      <div className={styles.profileSection}>
        <div className={styles.profilePicture}>
          <img src="images/icon/profile.png" alt="Profile" />

          {isLoggedIn ? (
            <div className={styles.profileInfo}>
              <div className={styles.userName}>{userInfo.user_name}</div>
              <div className={styles.userid}>{userInfo.user_nickname}</div>
            </div>
          ) : (
            <div className={styles.loginContainer} onClick={handleLoginClick}>
              <div className={styles.login}>로그인 해주세요</div>
              <img
                src="images/icon/loginArrow.png"
                className={styles.loginArrow}
              />
            </div>
          )}
        </div>
        <div
          className={styles.editInfoButton}
          onClick={() => handleClick("/EditProfilePage")}
        >
          내 정보 수정
        </div>
      </div>

      {reviewInfo && (
        <div className={styles.reservationSection}>
          <div className={styles.reservationTitle}>
            방문하신 "{reviewInfo.shop_name}"은 만족하셨나요?
          </div>
          <div className={styles.reservationItem}>
            <div className={styles.restaurantInfo}>
              <img
                src="/images/restaurant/interior3.png"
                className={styles.img}
              />
              <div className={styles.restaurantDetails}>
                <div className={styles.restaurantName}>{reviewInfo.shop_name}</div>
                <div className={styles.reservationDetails}>
                  {reviewInfo.reservation_info}
                </div>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src="/images/icon/star_gray.png"
                      alt="Star"
                    />
                  ))}
                </div>
              </div>
            </div>
            <Link
              to={`/ReviewPage?id=${reviewInfo.reservation_id}`}
              className={styles.link}
            >
              <div className={styles.reviewButton}>리뷰 쓰러가기</div>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.savedOmakaseHeader}>
        <div className={styles.savedOmakaseTitle}>저장한 오마카세</div>
        <div
          className={styles.viewMoreButton}
          onClick={() => handleClick("/StoragePage")}
        >
          더보기 <img src="/images/icon/arrow.png" alt="Arrow" />
        </div>
      </div>

      <BookmarkSwiper />

      <Nav
        home="/images/nav/home.png"
        map="/images/nav/map.png"
        review="/images/nav/review.png"
        reservation="/images/nav/reservation.png"
        profile="/images/nav/profile_red.png"
        homeColor="#747474"
        mapColor="#747474"
        reviewColor="#747474"
        reservationColor="#747474"
        profileColor="#BB0038"
      />
    </div>
  );
}

export default MyPage;
