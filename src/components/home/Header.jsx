import React from "react";
import styles from '../../styles/home/header.module.css';

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

function Header() {

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/SearchPage");
      window.scrollTo({ top: 0, behavior: "smooth" })
    };
   
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.homeText}>홈</div>
                
                <div className={styles.iconContainer}>
                    <div className={styles.search} onClick={handleClick} ><img src="/images/icon/search.png"/></div>
                    <div className={styles.alarm}><img src="/images/icon/alarm.png"/></div>
                </div>
            </div>
        </header>
    );
}

export default Header;