import React from "react";
import { useQuery } from "react-query";
import { Card, Image, Spin } from "antd";
import axios from "axios";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const cardUrl = "http://localhost:3030/cards?";

  const {
    data: cardsData,
    isError,
    isLoading,
    refetch,
  } = useQuery(["cards", page, limit], () => {
    props.params.set("page", page);
    props.params.set("limit", limit);
    console.log(cardUrl + props.params.toString());
    return axios.get(cardUrl + props.params.toString()).then((res) => res.data);
  });

  React.useEffect(() => {
    setPage(1);
    refetch();
  }, [props.params]);

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
  } else if (cardsData?.cards === null) {
    cardContent = (
      <div className="error">
        <p>No cards where found...</p>
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
            width="18rem"
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
    setPage(page);
    setLimit(limit);
  };

  return (
    <>
      <div className="cardList">
        <Card title="Cards">{cardContent}</Card>
      </div>

      <CardPagination
        cardCount={cardsData?.cardCount}
        page={cardsData?.page}
        paginationUpdate={paginationUpdate}
      />
    </>
  );
}
