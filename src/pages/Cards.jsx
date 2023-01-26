import React from "react";
import CardFilter from "../components/CardFilter";
import { useQuery } from "react-query";
import axios from "axios";
import CardList from "../components/CardList";
import { Spin, Typography } from "antd";

export default function Cards() {
  const baseUrl = new URL("http://localhost:3030/cards?");
  const [searchParams, setSearchParams] = React.useState(
    new URLSearchParams("?class=12&limit=10")
  );

  const {
    data: cardsData,
    isError,
    isLoading,
    refetch,
  } = useQuery(["cardsData"], () => {
    let newUrl = baseUrl.toString() + searchParams.toString();
    return axios.get(newUrl).then((res) => res.data);
  });

  if (isLoading) {
    return (
      <>
        <div className="loading">
          <Spin tip="Loading..." size="large" />
        </div>
      </>
    );
  }
  const { Title } = Typography;

  if (isError) {
    return <p>Error occured. Try again later</p>;
  }

  const nameUpdate = (name) => {
    let newSearchParams = searchParams;
    if (name === "") {
      newSearchParams.delete("name");
    } else {
      newSearchParams.set("name", name);
    }
    newSearchParams.set("page", 1);
    newSearchParams.delete("class");
    setSearchParams(newSearchParams);
    refetch();
  };

  const paginationUpdate = (page, limit) => {
    let newSearchParams = searchParams;
    newSearchParams.set("page", page);
    newSearchParams.set("limit", limit);
    setSearchParams(newSearchParams);
    refetch();
  };

  console.log(searchParams.toString());

  return (
    <div>
      <div className="title">
        <Title>Hearthstone Card Viewer</Title>
      </div>

      <CardFilter nameUpdate={nameUpdate} />
      <CardList
        cards={cardsData?.cards}
        paginationUpdate={paginationUpdate}
        pagination={{
          page: cardsData?.page,
          pageCount: cardsData?.pageCount,
          cardCount: cardsData?.cardCount,
        }}
      />
    </div>
  );
}
