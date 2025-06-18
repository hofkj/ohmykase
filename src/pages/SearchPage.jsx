import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/search/Search-Bar";
import Search from "../components/search/Search";
import SearchResult from "../components/search/SearchResult";
import NoSearchResults from "../components/search/NoSearchResults";
import styles from "../styles/pages/searchPage.module.css";
import axios from "axios";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
// const API_URL = import.meta.env.VITE_API_URL;

  // 검색 기록
  const fetchSearchHistory = useCallback(() => {
    axios
      .get(`/api/search/user_search_history/${apiKey}`, {
        withCredentials: true,
      })
      .then((res) => setSearchHistory(res.data))
      .catch((err) => console.error("검색 기록 불러오기 실패:", err));
  }, [apiKey]);

  // 해시태그 검색
  const handleSearch = async (input, dataFromTag = null) => {
    setKeyword(input);
    setHasSearched(true);

    if (dataFromTag) {
      setFilteredData(dataFromTag);
      return;
    }

    try {
      const res = await axios.post(
        `/api/search/user_search/${apiKey}`,
        { user_insert: input },
        { withCredentials: true }
      );
      setFilteredData(res.data);
      fetchSearchHistory();
    } catch (err) {
      console.error("검색 실패:", err);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, [fetchSearchHistory]);

  return (
    <div className={styles.page}>
      <SearchBar onSearch={(input) => handleSearch(input)} />
      {!hasSearched && (
        <Search
          onHashtagClick={(name, data) => handleSearch(name, data)}
          searchHistory={searchHistory}
        />
      )}
      {hasSearched && filteredData.length > 0 && (
        <SearchResult data={filteredData} keyword={keyword} />
      )}
      {hasSearched && filteredData.length === 0 && (
        <NoSearchResults keyword={keyword} />
      )}
    </div>
  );
}

export default SearchPage;
