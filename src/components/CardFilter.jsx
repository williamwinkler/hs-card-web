import React from "react";

export default function CardFilter(props) {
  const searchInput = React.useRef();

  function handleSearch() {
    props.func(searchInput.current.value);
  }

  return (
    <div className="cardFilter">
      <h3>Filters</h3>
      <input
        type={"text"}
        ref={searchInput}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder=" 🔎 Search"
      />
    </div>
  );
}
