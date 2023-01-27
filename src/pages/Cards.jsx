import React from "react";
//import CardFilter from "../components/CardFilter";

import CardList from "../components/CardList";
import { Typography } from "antd";

export default function Cards() {
  const { Title } = Typography;

  // const nameUpdate = (name) => {
  //   let newSearchParams = searchParams;
  //   if (name === "") {
  //     newSearchParams.delete("name");
  //   } else {
  //     newSearchParams.set("name", name);
  //   }
  //   newSearchParams.set("page", 1);
  //   newSearchParams.delete("class");
  //   setSearchParams(newSearchParams);
  //   refetch();
  // };

  //console.log(searchParams.toString());

  return (
    <div>
      <div className="title">
        <Title>Hearthstone Card Viewer</Title>
      </div>

      {/* <CardFilter /> */}
      <CardList />
    </div>
  );
}
