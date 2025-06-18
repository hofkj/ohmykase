import React from "react";
import Dropdown from "./Dropdown";

export default function MenuDropdown({ selected, setSelected }) {
  const menus = [
    { id: 1, name: "스시" },
    { id: 2, name: "튀김" },
    { id: 3, name: "라멘" },
    { id: 4, name: "가이세키" },
    { id: 5, name: "해산물" },
  ];


  const handleChange = (name) => {
    const selectedMenu = menus.find((menu) => menu.name === name);
    setSelected(selectedMenu?.id || null); // category_id를 전달
  };

  return (
    <Dropdown
      title="메뉴"
      options={menus.map((menu) => menu.name)}
      selected={
        selected
          ? menus.find((menu) => menu.id === selected)?.name
          : null
      }
      setSelected={handleChange}
    />
  );
}
