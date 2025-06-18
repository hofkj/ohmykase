import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import SearchPage from "./pages/SearchPage";
import ReservationPage from "./pages/ReservationPage";
import ReservationUserInfoPage from "./pages/ReservationUserInfoPage";
import CompletionPage from "./pages/CompletionPage";
import MyPage from "./pages/MyPage";
import EditProfilePage from "./pages/EditProfilePage";
import StoragePage from "./pages/StoragePage";
import NavReservationPage from "./pages/NavReservationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordPage from "./pages/PasswordPage";
import ReviewPage from "./pages/ReviewPage";
import NavReviewPage from "./pages/NavReviewPage";
import MapPage from "./pages/MapPage";
import EditReviewPage from "./pages/EditReviewPage";
import MorePage from "./pages/MorePage";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

const Main = () => {
  return (
    <div className="App">
      {/* <HomePage />  */}
      {/* <RestaurantPage/> */}
      {/* <SearchPage/> */}
      {/* <ReservationPage/> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RestaurantPage" element={<RestaurantPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/ReservationPage" element={<ReservationPage />} />
        <Route
          path="/ReservationUserInfoPage"
          element={<ReservationUserInfoPage />}
        />
        <Route path="/CompletionPage" element={<CompletionPage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/StoragePage" element={<StoragePage />} />
        <Route path="/NavReservationPage" element={<NavReservationPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/PasswordPage" element={<PasswordPage />} />
        <Route path="ReviewPage" element={<ReviewPage />} />
        <Route path="NavReviewPage" element={<NavReviewPage />} />
        <Route path="MapPage" element={<MapPage />} />
        <Route path="EditReviewPage" element={<EditReviewPage />} />
        <Route path="MorePage" element={<MorePage />} />
        <Route path="/RestaurantPage/:id" element={<RestaurantPage />} />
        {/* <Route path="/EditReviewPage/:reservation_id" element={<EditReviewPage />} /> */}
        <Route
          path="/edit-review/:reservationId"
          element={<EditReviewPage />}
        />
        {/* 테스트 */}
      </Routes>
    </div>
  );
};

export default App;
