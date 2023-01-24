import React from "react";
import CardList from "../components/CardList";
import CardFilter from "../components/CardFilter";
import hsCardClient from "../services/hsCardClient";

export default function Cards() {
  const [cards, setCards] = React.useState(null);

  React.useEffect(() => {
    async function fetchCards() {
      try {
        let response = await hsCardClient.GetCards();
        response = await response.cards;
        setCards(response);
      } catch (e) {
        return <p>An error occured. Try again later</p>;
      }
    }

    fetchCards();
  }, []);

  return (
    <div>
      <h1>Cards</h1>
      <CardFilter />
      <CardList cards={cards} />
    </div>
  );
}
