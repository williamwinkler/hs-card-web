import React from "react";

export default function Pagination(props) {
  const page = props.pagination.page;
  const pageCount = props.pagination.pageCount;
  const paginationUpdate = props.func;

  let backDisabled = false;
  if (page === 1) {
    backDisabled = true;
  }

  let nextDisabled = false;
  if (page === pageCount) {
    nextDisabled = true;
  }
  function handleBackClick() {
    if (page === 1) return;
    paginationUpdate(page - 1);
  }

  function handleNextClick() {
    paginationUpdate(page + 1);
  }

  return (
    <div className="pagination">
      <button
        className="backOrForthBtn"
        onClick={handleBackClick}
        disabled={backDisabled}
      >
        Back
      </button>

      <div className="currentPage">{page}</div>

      <button
        className="backOrForthBtn"
        onClick={handleNextClick}
        disabled={nextDisabled}
      >
        Forward
      </button>
    </div>
  );
}
