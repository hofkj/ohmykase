import React, { useState } from "react";
import styles from "../../styles/search/searchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input); // 상위 컴포넌트로 검색어 전달
    }
  };

  const handleCancel = () => {
    setInput(""); // 입력 초기화
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <img
        src="/images/icon/header_arrow.png"
        className={styles.backBtn}
        onClick={handleBack}
        alt="뒤로가기"
      />

      <div className={styles.inputContainer}>
        <img
          src="/images/icon/search_icon.png"
          className={styles.searchIcon}
          alt="검색 아이콘"
        />
        <input
          placeholder="검색"
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button type="button" className={styles.btn} onClick={handleCancel}>
        취소
      </button>
    </form>
  );
}

export default SearchBar;
