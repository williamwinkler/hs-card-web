import React from "react";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const cards = props.cards;

  if (!cards) {
    return <div>No cards found...</div>;
  }

  return (
    <>
      <div className="cardList" style={cardListStyle}>
        {cards.map((card) => {
          return <img src={card.image} key={card.id} height="400rem"></img>;
        })}
      </div>
      <CardPagination
        pagination={props.pagination}
        paginationUpdate={props.paginationUpdate}
      />
    </>
  );
}

const cardListStyle = {
  padding: "0rem",
  justifyContent: "center",
};
