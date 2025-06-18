import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import Time from './Time';
import styles from "../../styles/reservation/timeSwiper.module.css";

function TimeSwiper({ activeTime, setActiveTime }) {
    const handleTimeClick = (time) => {
        setActiveTime(time);
    };

    const times = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    return (
        <div className={styles.timeContainer}>
            <Swiper
                slidesPerView={5.3}
                freeMode={true}
                modules={[FreeMode, Pagination]}
                className={styles.swiper}
            >
                {times.map((time) => (
                    <SwiperSlide key={time}>
                        <Time
                            time={time}
                            isActive={activeTime === time}
                            onClick={() => handleTimeClick(time)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TimeSwiper;