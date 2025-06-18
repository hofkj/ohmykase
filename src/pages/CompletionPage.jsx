import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/pages/CompletionPage.module.css";
import TitleHeaderBar from "../components/common/TitleHeaderBar";
import TwoBottomButton from "../components/common/TwoBottomButton";

function CompletionPage() {
  return (
    <div className={styles.container}>
      <TitleHeaderBar title="예약하기"/>

      <div className={styles.successContainer}>
        <img src="/images/icon/success.png"/>
        <div className={styles.successMessage}>예약 신청되었습니다</div>
        <div className={styles.successDescription}>
          해당 매장에서 <span className={styles.redText}>예약을 확정</span>하는 대로 <br/>
          작성해주신 매일로 알려드리겠습니다.
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoMessage}>
          확인 버튼을 누를 시 이후 <span className={styles.pointText}>예약 정보에 대한 수정</span>이 어렵습니다.
        </div>
        <div className={styles.infoMessage}>
          예약 확정 후 방문하지 않을 시 <span className={styles.pointText}>서비스 사용에 제한</span>이 됩니다.
        </div>
      </div>

      <TwoBottomButton 
        back="홈으로 가기"
        next="예약 내역 보기"
        navigateToBack="/" 
        navigateToNext="/NavReservationPage"/>
    </div>
  );
}

export default CompletionPage;
