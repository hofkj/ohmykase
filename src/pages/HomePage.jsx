import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/home/Banner";
import Header from "../components/home/Header";
import LocationDropdown from "../components/home/LocationDropdown";
import MenuDropdown from "../components/home/MenuDropdown";
import Omakase from "../components/home/Omakase";
import RestaurantSwiper from "../components/home/RestaurantSwiper";
import Nav from "../components/common/Nav";
import styles from "../styles/pages/homePage.module.css";
import axios from "axios";

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [filteredShops, setFilteredShops] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const navigate = useNavigate();
  const apiKey = "7VCEB37-69B4CKZ-QV2674N-BTZTWXE";
// const API_URL = import.meta.env.VITE_API_URL;


  const fetchShops = async () => {
    try {
      if (selectedLocation && !selectedMenu) {
        const res = await axios.get(
          `/api/search/areafilter/${apiKey}/${selectedLocation}`,
        { withCredentials: true }
        );
        setFilteredShops(res.data);
      } else if (!selectedLocation && selectedMenu) {
        const res = await axios.get(
          `/api/search/categoryfilter/${apiKey}/${selectedMenu}`,
        { withCredentials: true }
        );
        setFilteredShops(res.data);
      } else if (selectedLocation && selectedMenu) {
        const [areaRes, categoryRes] = await Promise.all([
          axios.get(
            `/api/search/areafilter/${apiKey}/${selectedLocation}`,
        { withCredentials: true }
          ),
          axios.get(
            `/api/search/categoryfilter/${apiKey}/${selectedMenu}`,
        { withCredentials: true }
          ),
        ]);
        const intersection = areaRes.data.filter((areaShop) =>
          categoryRes.data.some((catShop) => catShop.id === areaShop.id)
        );
        setFilteredShops(intersection);
      } else {
        const res = await axios.get(
          `/api/shop/shop_list/${apiKey}`,
        { withCredentials: true }
        );
        setAllShops(res.data);
      }
    } catch (err) {
      console.error("가게 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [selectedLocation, selectedMenu]);

  useEffect(() => {
    axios
      .get(`/api/shop/shop_list/${apiKey}`,
        { withCredentials: true })
      .then((res) => setAllShops(res.data))
      .catch((err) => console.error("전체 가게 불러오기 실패:", err));
  }, []);

  const getLocationName = (id) =>
    [
      { id: 1, name: "도쿄" },
      { id: 2, name: "오사카" },
      { id: 3, name: "교토" },
      { id: 4, name: "나고야" },
      { id: 5, name: "삿포로" },
      { id: 6, name: "후쿠오카" },
      { id: 7, name: "히로시마" },
    ].find((loc) => loc.id === id)?.name;

  const getMenuName = (id) =>
    [
      { id: 1, name: "스시" },
      { id: 2, name: "튀김" },
      { id: 3, name: "라멘" },
      { id: 4, name: "가이세키" },
      { id: 5, name: "해산물" },
    ].find((menu) => menu.id === id)?.name;

  const handleFilteredMore = () => {
    navigate("/MorePage", {
      state: {
        shops: filteredShops,
        title: `${getLocationName(selectedLocation) || ""} ${
          getMenuName(selectedMenu) || ""
        } 오마카세`.trim(),
      },
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <Banner />

      <div className={styles.dropdownContainer}>
        <LocationDropdown
          selected={selectedLocation}
          setSelected={setSelectedLocation}
        />
        <MenuDropdown selected={selectedMenu} setSelected={setSelectedMenu} />
      </div>

      {(selectedLocation || selectedMenu) && (
        <>
          <Omakase
            title={`${getLocationName(selectedLocation) || ""} ${
              getMenuName(selectedMenu) || ""
            } 오마카세`.trim()}
            subtitle="조건에 맞는 오마카세를 확인해보세요"
            onMoreClick={handleFilteredMore}
          />
          <RestaurantSwiper shopList={filteredShops} />
        </>
      )}

      <Omakase
        title="인기 오마카세"
        subtitle="이용객들이 만족한 오마카세를 확인해보세요"
        onMoreClick={() =>
          navigate("/MorePage", {
            state: { shops: allShops, title: "인기 오마카세" },
          })
        }
      />
      <RestaurantSwiper shopList={allShops} />

      <Omakase
        title="혼자만의 시간을 보내고 싶은 때"
        subtitle="혼자 방문하기 좋은 오마카세"
        onMoreClick={() =>
          navigate("/MorePage", {
            state: { shops: allShops, title: "혼자만의 시간을 보내고 싶은 때" },
          })
        }
      />
      <RestaurantSwiper shopList={allShops} />

      <Nav
        home="/images/nav/home_red.png"
        map="/images/nav/map.png"
        review="/images/nav/review.png"
        reservation="/images/nav/reservation.png"
        profile="/images/nav/profile.png"
        homeColor="#BB0038"
        mapColor="#747474"
        reviewColor="#747474"
        reservationColor="#747474"
        profileColor="#747474"
      />
    </div>
  );
}

export default HomePage;
