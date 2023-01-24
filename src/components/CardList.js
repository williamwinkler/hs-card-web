import React from "react";

export default function CardList(props) {
  const cards = props.cards;

  if (!cards) {
    return <div>No cards found...</div>;
  }

  return (
    <div className="cardList">
      {/* <ul>
        {cards.map((card) => {
          return <li key={card.id}>{card.name}</li>;
        })}
      </ul> */}
      {cards.map((card) => {
        return <img src={card.image} key={card.id}></img>;
      })}
    </div>
  );
}
