import React from "react";
import Dropdown from "./Dropdown";

export default function LocationDropdown({ selected, setSelected }) {
   const locations = [
    { id: 1, name: "도쿄" },
    { id: 2, name: "오사카" },
    { id: 3, name: "교토" },
    { id: 4, name: "나고야" },
    { id: 5, name: "삿포로" },
    { id: 6, name: "후쿠오카" },
    { id: 7, name: "히로시마" },
  ];

  const handleChange = (name) => {
    const selectedLocation = locations.find((loc) => loc.name === name);
    setSelected(selectedLocation?.id || null); // id를 전달
  };

  return (
    <Dropdown
      title="지역"
      options={locations.map((loc) => loc.name)} // 이름만 전달
      selected={
        selected
          ? locations.find((loc) => loc.id === selected)?.name
          : null
      }
      setSelected={handleChange}
    />
  );
}
