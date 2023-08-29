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
    params = modifyParams(params, "attack", filter.attack);
    params = modifyParams(params, "health", filter.health);
    params = modifyParams(params, "manaCost", filter.mana);
  }

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
  if (
    (paramName === "keywords" || paramName === "type") &&
    Array.isArray(paramValue)
  ) {
    if (paramValue.length === 0) {
      // Remove the parameter if the array is empty
      params.delete(paramName);
    } else {
      params.set(paramName, paramValue.join(","));
    }
  } else if (paramValue !== undefined) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }
  return params;
}
