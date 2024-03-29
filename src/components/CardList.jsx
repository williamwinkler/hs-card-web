import React from "react";
import { useQuery } from "react-query";
import { Image, Spin } from "antd";
import axios from "axios";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const cardUrl = "https://" + window.location.hostname + "/api/v1/cards?";

  const {
    data: cardsData,
    isError,
    isLoading,
    refetch,
  } = useQuery(["cards", page, limit], () => {
    props.params.set("page", page);
    props.params.set("limit", limit);
    if (!props.params.has("type")) {
      props.params.set("type", [4, 5, 7]);
    }

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
        <p>An error occurred. Try again later.</p>
      </div>
    );
  } else if (cardsData?.cards === null) {
    cardContent = (
      <div className="error">
        <p>No cards were found...</p>
      </div>
    );
  } else {
    cardContent = (
      <div className="cardList">
        {cardsData.cards.map((card) => (
          <Image
            key={card.id}
            src={card.image}
            height={"25rem"}
            width={"18rem"}
            preview={true}
            placeholder={true}
            loading="eager"
          />
        ))}
      </div>
    );
  }

  const paginationUpdate = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };

  return (
    <>
      {cardContent}
      <div className="pagination">
        <CardPagination
          cardCount={cardsData?.cardCount}
          page={cardsData?.page}
          paginationUpdate={paginationUpdate}
        />
      </div>
    </>
  );
}
