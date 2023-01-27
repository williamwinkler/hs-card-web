import React from "react";
import { useQuery } from "react-query";
import { Card, Image, Spin } from "antd";
import axios from "axios";
import CardPagination from "./CardPagination";

export default function CardList() {
  const baseUrl = new URL("http://localhost:3030/cards?");
  const [searchParams, setSearchParams] = React.useState(
    new URLSearchParams("?class=12&limit=10")
  );

  const {
    data: cardsData,
    isError,
    isLoading,
    refetch,
  } = useQuery(["cardsData", searchParams], () => {
    let newUrl = baseUrl.toString() + searchParams.toString();
    return axios.get(newUrl).then((res) => res.data);
  });

  let cardContent;
  if (isLoading) {
    cardContent = (
      <div className="loading">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  } else if (isError) {
    cardContent = (
      <div className="error">
        <p>An error occured. Try again later.</p>
      </div>
    );
  } else {
    const cardPictures = [];
    cardsData?.cards.map((card) => {
      <div className="cardList">
        {cardPictures.push(
          <Image
            key={card.id}
            src={card.image}
            height="25rem"
            preview={true}
            placeholder={true}
            loading="lazy"
          />
        )}
      </div>;
    });
    cardContent = cardPictures;
  }

  const paginationUpdate = (page, limit) => {
    let newSearchParams = searchParams;
    newSearchParams.set("page", page);
    newSearchParams.set("limit", limit);
    setSearchParams(newSearchParams);
    refetch();
  };

  return (
    <>
      <div className="cardList">
        <Card title="Cards">{cardContent}</Card>
      </div>
      {!isLoading && !isError && (
        <CardPagination
          cardCount={cardsData?.cardCount}
          page={cardsData?.page}
          paginationUpdate={paginationUpdate}
        />
      )}
    </>
  );
}
