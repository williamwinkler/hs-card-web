import React from "react";
import { useQuery } from "react-query";
import { Image, Spin } from "antd";
import axios from "axios";
import CardPagination from "./CardPagination";

export default function CardList(props) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const cardUrl = "https://hscards.duckdns.org/api/v1/cards?";

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
            height={isMobile ? "15rem" : "25rem"} // Adjust height for mobile view
            width={isMobile ? "10rem" : "18rem"} // Adjust width for mobile view
            preview={true}
            placeholder={true}
            loading="lazy"
            style={{ marginBottom: "10px" }} // Add some space between cards
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

      <CardPagination
        cardCount={cardsData?.cardCount}
        page={cardsData?.page}
        paginationUpdate={paginationUpdate}
      />
    </>
  );
}
