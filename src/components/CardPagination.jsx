import React from "react";
import { Pagination, Space } from "antd";

export default function CardPagination(props) {
  const page = props.page;
  let cardCount = props.cardCount;

  function updatePagination(page, limit) {
    props.paginationUpdate(page, limit);
  }

  if (!cardCount) {
    cardCount = 0;
  }

  return (
    <div className="cardPagination">
      <Space>
        <Pagination
          defaultCurrent={page}
          total={cardCount}
          showSizeChanger={true}
          showTotal={() => "Cards found: " + cardCount}
          onChange={updatePagination}
          pageSizeOptions={[10, 20, 40]}
          defaultPageSize={10}
        />
      </Space>
    </div>
  );
}
