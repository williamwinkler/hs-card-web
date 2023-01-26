import { Space, Select, Input } from "antd";
import React from "react";

export default function CardFilter(props) {
  function handleSearch(value) {
    props.nameUpdate(value);
  }

  function handleCardType(value) {
    if (value === undefined) {
      console.log("Nothing");
    }
  }

  function handleMechanic(value) {
    console.log(value);
  }

  return (
    <div className="cardFilter">
      <Space>
        <Input.Search placeholder="Search" onSearch={handleSearch} />
        <Select
          style={{ width: 120 }}
          allowClear
          options={[{ value: "Divine Shield", label: "Divine Shield" }]}
          onSelect={handleMechanic}
          onClear={handleMechanic}
          placeholder="Mechanic"
        />
        <Select
          style={{ width: 120 }}
          allowClear
          options={[{ value: "Spell", label: "Spell" }]}
          onSelect={handleCardType}
          onClear={handleCardType}
          placeholder="Card Type"
        />
      </Space>
    </div>
  );
}

// <div className="cardFilter">
//   <h3>Filters</h3>
//   <input
//     type={"text"}
//     ref={searchInput}
//     onKeyDown={(event) => {
//       if (event.key === "Enter") {
//         handleSearch();
//       }
//     }}
//     placeholder=" 🔎 Search"
//   />
// </div>
