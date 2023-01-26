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

  return (
    <Space>
      <Input.Search placeholder="Search" onSearch={handleSearch} />
      <Select
        style={{ width: 120 }}
        allowClear
        options={[{ value: "Spell", label: "Spell" }]}
        onSelect={handleCardType}
        onClear={handleCardType}
        placeholder="Type"
      />
    </Space>
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
