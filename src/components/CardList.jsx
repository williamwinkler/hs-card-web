import { Card, Image } from "antd";
import React from "react";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const cards = props.cards;
  if (!cards) {
    return <div style={{ height: "1000px" }}>No cards found...</div>;
  }

  let gridCards = [];
  cards.map((card) => {
    gridCards.push(
      <Image
        src={card.image}
        height="25rem"
        preview={true}
        placeholder={true}
      />
    );
  });

  return (
    <>
      <div className="cardList">
        <Card title="Cards">{gridCards}</Card>
      </div>
      <CardPagination
        pagination={props.pagination}
        paginationUpdate={props.paginationUpdate}
      />
    </>
  );
}
