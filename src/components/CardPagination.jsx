import React from "react";
import { Pagination } from "antd";

export default function CardPagination(props) {
  const page = props.pagination.page;
  //const pageCount = props.pagination.pageCount;
  const cardCount = props.pagination.cardCount;

  function updatePagination(page, limit) {
    console.log(page, limit);
    props.paginationUpdate(page, limit);
  }

  return (
    <div style={cardPaginationStyle}>
      <Pagination
        defaultCurrent={page}
        total={cardCount}
        showSizeChanger={true}
        showTotal={() => "Cards found: " + cardCount}
        onChange={updatePagination}
        pageSizeOptions={[10, 20, 40]}
      />
    </div>
  );
}

const cardPaginationStyle = {
  padding: "1rem",
  justifyContent: "center",
};

// <div className="pagination">
//   <button
//     className="backOrForthBtn"
//     onClick={handleBackClick}
//     disabled={backDisabled}
//   >
//     Back
//   </button>

//   <div className="currentPage">{page}</div>

//   <button
//     className="backOrForthBtn"
//     onClick={handleNextClick}
//     disabled={nextDisabled}
//   >
//     Forward
//   </button>
// </div>
