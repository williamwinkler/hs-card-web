import React from "react";
import CardList from "../components/CardList";
import CardFilter from "../components/CardFilter";
//import hsCardClient from "../services/hsCardClient";
import { useQuery } from "react-query";
import axios from "axios";

export default function Cards() {
  const newSearchParam = new URLSearchParams().append("class", 12);
  const [searchParams, setSearchParam] = React.useState(newSearchParam);

  const {
    data: cardsData,
    isLoading,
    isError,
  } = useQuery(["cardsData"], () => {
    console.log(searchParams);
    return axios
      .get("http://localhost:3030/cards?" + searchParams.toString())
      .then((res) => res.data);
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occured. Try again later</p>;
  }

  const nameUpdate = (name) => {
    updateQuery("name", name);
  };

  const paginationUpdate = (page) => {
    updateQuery("page", page);
  };

  console.log(searchParams);
  console.log(cardsData);

  function updateQuery(name, value) {
    let newSearchParam = searchParams;
    newSearchParam.set(name, value);
    setSearchParam(newSearchParam);
  }

  return (
    <div>
      <h1>Cards</h1>
      <CardFilter func={nameUpdate} />
      <CardList
        cards={cardsData?.cards}
        pagination={{ page: cardsData?.page, pageCount: cardsData?.pageCount }}
        func={paginationUpdate}
      />
    </div>
  );
}

// React.useEffect(() => {
//   async function fetchCards() {
//     try {
//       let response = await hsCardClient.GetCards(query);
//       //console.log(response);
//       response = await response;
//       setCards(response.cards);
//       setPagination({ page: response.page, pageCount: response.pageCount });
//     } catch (e) {
//       console.log(e);
//       return <p>An error occured. Try again later</p>;
//     }
//   }

//   fetchCards();
// }, [query]);
