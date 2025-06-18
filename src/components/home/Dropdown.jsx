import React, { useState } from "react";
import styles from "../../styles/home/dropdown.module.css";

export default function Dropdown({ title, options, selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdown}>
            <button 
                className={`${styles.dropdownButton} ${isOpen ? styles.active : ""}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || title}
                <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {options.map((option) => (
                        <li 
                            key={option} 
                            className={selected === option ? styles.selected : ""} 
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
