import React from "react";
import styles from "../../styles/restaurant/imageGallery.module.css";

export default function ImageGallery({ images }) {
    return (
        <div className={styles.imageGallery}>
            {images.map((img, index) => (
                <img key={index} src={img} alt="레스토랑 내부 사진" />
            ))}
        </div>
    );
}
