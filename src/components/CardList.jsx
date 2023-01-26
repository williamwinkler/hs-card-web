import { Card, Image } from "antd";
import React from "react";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const cards = props.cards;
  if (!cards) {
    return <div style={{ height: "1000px" }}>No cards found...</div>;
  }

  const cardWidth = "20%";

  let gridCards = [];
  cards.map((card) => {
    gridCards.push(
      <Card.Grid
        key={card.id}
        style={{
          width: cardWidth,
          height: "420px",
          textAlign: "center",
          alignItems: "center",
          background: "white",
        }}
      >
        <Image src={card.image} height="100%" placeholder={true} />
      </Card.Grid>
    );
  });

  return (
    <>
      <Card title="Cards">{gridCards}</Card>
      <div className="cardPagination">
        <CardPagination
          pagination={props.pagination}
          paginationUpdate={props.paginationUpdate}
        />
      </div>
    </>
  );
}
