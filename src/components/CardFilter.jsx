import { Space, Input, Select, Switch } from "antd";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const baseUrl = "http://localhost:3030";

export default function CardFilter(props) {
  const [name, setName] = React.useState();
  const [mechanics, setMechanics] = React.useState([]);
  const [type, setType] = React.useState();
  const [rarity, setRarity] = React.useState();
  const [set, setSet] = React.useState();
  const [classId, setClassId] = React.useState();
  const [mana, setMana] = React.useState();
  const [golden, setGolden] = React.useState();

  const { data: typesData } = useQuery("types", () => {
    return axios.get(baseUrl + "/types").then((res) => res.data);
  });
  let types = [];
  typesData?.forEach((e) => {
    types.push({
      value: e.id,
      label: e.name,
    });
  });

  const { data: keywordsData } = useQuery("keywords", () => {
    return axios.get(baseUrl + "/keywords").then((res) => res.data);
  });
  let keywords = [];
  keywordsData?.forEach((e) => {
    keywords.push({
      value: e.id,
      label: e.name,
    });
  });

  const { data: raritiesData } = useQuery("rarities", () => {
    return axios.get(baseUrl + "/rarities").then((res) => res.data);
  });
  let rarities = [];
  raritiesData?.forEach((e) => {
    rarities.push({
      value: e.id,
      label: e.name,
    });
  });

  const { data: setsData } = useQuery("sets", () => {
    return axios.get(baseUrl + "/sets").then((res) => res.data);
  });
  let sets = [];
  setsData?.forEach((e) => {
    sets.push({
      value: e.id,
      label: e.name,
    });
  });

  const { data: classesData } = useQuery("classes", () => {
    return axios.get(baseUrl + "/classes").then((res) => res.data);
  });
  let classes = [];
  classesData?.forEach((e) => {
    classes.push({
      value: e.id,
      label: e.name,
    });
  });

  const manaOptions = createManaOptions();

  const updateName = (event) => {
    const value = event.target.value;
    if (value != "") {
      setName(value);
    } else {
      setName(undefined);
    }
  };

  function updateMechanics(selectedMechanic) {
    // Check if the selected mechanic already exists in the state
    if (mechanics && mechanics.includes(selectedMechanic)) {
      // If it exists, remove it from the state
      setMechanics(
        mechanics.filter((mechanic) => mechanic !== selectedMechanic)
      );
    } else {
      // If it doesn't exist, add it to the state
      setMechanics([...mechanics, selectedMechanic]);
    }
  }

  React.useEffect(() => {
    if (typesData && !typesData.isLoading) {
      const newFilter = {
        name: name,
        keywords: mechanics,
        type: type ? type : types.find((x) => x.label === "Minion")?.value,
        rarity: rarity,
        set: set,
        class: classId,
        mana: mana,
        golden: golden,
      };

      console.log(newFilter);
      props.updateFilter(newFilter);
    }
  }, [name, mechanics, type, rarity, set, classId, mana, golden, typesData]);

  return (
    <div className="cardFilter">
      <Space block={true}>
        <Input.Search placeholder="Search" onChange={updateName} />
        <Select
          style={{ width: 120 }}
          options={types}
          onSelect={setType}
          onClear={setType}
          placeholder="Type"
          defaultValue={"Minion"}
        />
        <Select
          style={{ width: 180 }}
          mode="multiple"
          allowClear
          options={keywords}
          value={mechanics}
          onSelect={updateMechanics}
          onDeselect={updateMechanics}
          onClear={setMechanics}
          placeholder="Mechanic"
        />
        <Select
          style={{ width: 120 }}
          allowClear
          options={rarities}
          onSelect={setRarity}
          onClear={setRarity}
          placeholder="Rarity"
        />
        <Select
          style={{ width: 220 }}
          allowClear
          options={sets}
          onSelect={setSet}
          onClear={setSet}
          placeholder="Set"
        />
        <Select
          style={{ width: 180 }}
          allowClear
          options={classes}
          onSelect={setClassId}
          onClear={setClassId}
          placeholder="Class"
        />
        <Select
          style={{ width: 120 }}
          allowClear
          options={manaOptions}
          onSelect={setMana}
          onClear={setMana}
          placeholder="Mana"
        />
        <Switch
          onChange={setGolden}
          checkedChildren="Gold"
          unCheckedChildren="Normal"
        />
      </Space>
    </div>
  );
}

function createManaOptions() {
  let manaOptions = [];
  for (let i = 0; i < 7; i++) {
    manaOptions.push({
      value: i,
      label: i,
    });
  }
  manaOptions.push({
    value: 99,
    label: "7+",
  });
  return manaOptions;
}
