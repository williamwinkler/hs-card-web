import React from "react";
import Pagination from "./Pagination";

export default function CardList(props) {
  const cards = props.cards;

  if (!cards) {
    return <div>No cards found...</div>;
  }

  return (
    <>
      <div className="cardList">
        {cards.map((card) => {
          return <img src={card.image} key={card.id} height="400rem"></img>;
        })}
      </div>
      <Pagination pagination={props.pagination} func={props.func} />
    </>
  );
}
