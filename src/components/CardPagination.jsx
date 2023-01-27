import React from "react";
import { Pagination, Space } from "antd";

export default function CardPagination(props) {
  const page = props.pagination.page;
  const cardCount = props.pagination.cardCount;

  function updatePagination(page, limit) {
    props.paginationUpdate(page, limit);
  }

  return (
    <div className="cardPsagination">
      <Space align="center">
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