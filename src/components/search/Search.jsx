import React, { useState, useEffect } from "react";
import Hashtag from "./Hashtags";
import Record from "./Record";
import styles from "../../styles/pages/searchPage.module.css";
import axios from "axios";

function Search({ onHashtagClick, searchHistory }) {
  const [hashtags, setHashtags] = useState([]);
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`/api/search/random_tag/${apiKey}`,
        { withCredentials: true })
      .then((res) => {
        setHashtags(res.data);
      })
      .catch((error) => {
        console.error("해시태그 불러오기 실패:", error);
      });
  }, []);

  const handleTagClick = async (tagId, tagName) => {
    try {
      const res = await axios.get(
        `/api/search/tagfilter/${apiKey}/${tagId}`,
        { withCredentials: true }
      );
      onHashtagClick(tagName, res.data);
    } catch (err) {
      console.error("해시태그 검색 실패:", err);
      onHashtagClick(tagName, []);
    }
  };

  return (
    <>
      <div className={styles.hashtagContainer}>
        {hashtags.map((tag, index) => (
          <div key={index} onClick={() => handleTagClick(tag.id, tag.tag_name)}>
            <Hashtag info={tag.tag_name} />
          </div>
        ))}
      </div>

      <div className={styles.recentContainer}>
        <div className={styles.recent}>최근 검색 기록</div>
        {searchHistory.map((item, index) => (
          <div key={index} onClick={() => onHashtagClick(item.user_searched)}>
            <Record keyword={item.user_searched} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
