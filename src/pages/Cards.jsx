import React from "react";
import CardFilter from "../components/CardFilter";
import CardList from "../components/CardList";
import { Typography } from "antd";

export default function Cards() {
  const { Title } = Typography;
  const [filter, setFilter] = React.useState();

  const updateFilter = (value) => {
    setFilter(value);
  };

  let params = new URLSearchParams();
  if (filter) {
    params = modifyParams(params, "name", filter.name);
    params = modifyParams(params, "type", filter.type);
    params = modifyParams(params, "keywords", filter.keywords);
    params = modifyParams(params, "rarity", filter.rarity);
    params = modifyParams(params, "set", filter.set);
    params = modifyParams(params, "class", filter.class);
    params = modifyParams(params, "manaCost", filter.mana);
  }

  console.log(params);

  return (
    <div>
      <div className="title">
        <Title>Hearthstone Card Viewer</Title>
      </div>

      <CardFilter updateFilter={updateFilter} />
      <CardList params={params} />
    </div>
  );
}

function modifyParams(params, paramName, paramValue) {
  if (paramName === "keywords" && paramValue && Array.isArray(paramValue)) {
    // Serialize the array of keywords into a comma-separated string
    params.set(paramName, paramValue.join(","));
  } else if (paramValue !== undefined) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }
  return params;
}
