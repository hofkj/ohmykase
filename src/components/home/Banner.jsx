import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

//../../styles/home/banner.module.css
import styles from "../../styles/home/banner.module.css";

const images = [
    "/images/benner/benner_img1.png",
    "/images/benner/benner_img2.png",
    "/images/benner/benner_img3.png",
    "/images/benner/benner_img4.png",
    "/images/benner/benner_img5.png"
];

function Banner() {
    return (
        <div className={styles.bennerContainer}>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                className={styles.bennerSwiper}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img src={src} alt={`Banner ${index + 1}`} className={styles.bennerImg} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;
