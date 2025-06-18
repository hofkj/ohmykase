import React from "react";
import styles from "../../styles/restaurant/restaurantImage.module.css";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

function Arrow() {

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" })
    };
   
    return (
        <div>
            <img src="../../images/icon/arrow_white.png" className={styles.arrow} onClick={handleClick} />

        </div>
    )
}
export default Arrow;