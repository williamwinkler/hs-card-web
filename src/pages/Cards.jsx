import React from "react";
import CardFilter from "../components/CardFilter";
import { useQuery } from "react-query";
import axios from "axios";
import CardList from "../components/CardList";

export default function Cards() {
  const baseUrl = new URL("http://localhost:3030/cards?");
  const [searchParams, setSearchParams] = React.useState(
    new URLSearchParams("?class=12&limit=3")
  );

  const {
    data: cardsData,
    isError,
    refetch,
  } = useQuery(["cardsData"], () => {
    let newUrl = baseUrl.toString() + searchParams.toString();
    return axios.get(newUrl).then((res) => res.data);
  });

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

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
    setSearchParams(newSearchParams);
    refetch();
  };

  const paginationUpdate = (page) => {
    let newSearchParams = searchParams;
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
    refetch();
  };

  console.log(searchParams.toString());

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
