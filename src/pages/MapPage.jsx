import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import Nav from "../components/common/Nav";
import MapItem from "../components/map/MapItem";
import styles from "../styles/pages/MapPage.module.css";

export default function MapPage() {
  const location = useLocation();
  const mapSrc =
    location.state?.mapSrc ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7840459.679012818!2d131.39455198440953!3d42.61614138137222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2z7J2867O4!5e0!3m2!1sko!2skr!4v1747923963702!5m2!1sko!2skr";
  const shopId = location.state?.shopId || null;

  const [open, setOpen] = useState(true);
  const sheetRef = useRef();

  return (
    <>
      <div className={styles.map}>
        <iframe
          src={mapSrc}
          width="400"
          height="700"
          style={{ border: "1px solid #ccc" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <BottomSheet
        blocking={false}
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.9,
          maxHeight / 2,
          maxHeight * 0.2,
        ]}
        open={open}
        ref={sheetRef}
      >
        <div style={{ height: "100%", overflowY: "auto" }}>
          <MapItem shopId={shopId} />
        </div>
      </BottomSheet>

      <Nav
        home="/images/nav/home.png"
        map="/images/nav/map_red.png"
        review="/images/nav/review.png"
        reservation="/images/nav/reservation.png"
        profile="/images/nav/profile.png"
        homeColor="#747474"
        mapColor="#BB0038"
        reviewColor="#747474"
        reservationColor="#747474"
        profileColor="#747474"
      />
    </>
  );
}