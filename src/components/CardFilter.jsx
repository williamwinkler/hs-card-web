import { Input, Select } from "antd";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const baseUrl = "https://hscards.duckdns.org/api/v1";

export default function CardFilter(props) {
  const [name, setName] = React.useState();
  const [mechanics, setMechanics] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [rarity, setRarity] = React.useState();
  const [set, setSet] = React.useState();
  const [classId, setClassId] = React.useState();
  const [attack, setAttack] = React.useState();
  const [health, setHealth] = React.useState();
  const [mana, setMana] = React.useState();

  const { data: typesData } = useQuery("types", () => {
    return axios.get(baseUrl + "/types").then((res) => res.data);
  });
  let types = [];
  typesData?.forEach((e) => {
    if (e.name === "HeroPower" || e.name === "Reward") {
      return;
    }
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

  function updateType(selectedType) {
    if (type && type.includes(selectedType)) {
      setType(type.filter((type) => type !== selectedType));
    } else if (type && type.length > 0) {
      setType([...type, selectedType]);
    } else {
      setType([selectedType]);
    }
  }

  React.useEffect(() => {
    if (typesData && !typesData.isLoading) {
      const newFilter = {
        name: name,
        keywords: mechanics,
        type: type
          ? type
          : types
              .filter((e) => ["Minion", "Spell", "Weapon"].includes(e.label))
              .map((e) => e.value),
        rarity: rarity,
        set: set,
        class: classId,
        attack: attack,
        health: health,
        mana: mana,
      };
      console.log(newFilter);
      props.updateFilter(newFilter);
    }
  }, [
    name,
    mechanics,
    type,
    rarity,
    set,
    classId,
    attack,
    health,
    mana,
    typesData,
  ]);

  return (
    <div className="cardFilter">
      <Input.Search placeholder="Search" onChange={updateName} />
      <div className="advanced">
        <Select
          style={{ width: 120 }}
          options={types}
          onSelect={updateType}
          onDeselect={updateType}
          onClear={setType}
          placeholder="Type"
          allowClear
          mode="multiple"
          placement="topLeft"
        />
        <Select
          style={{ width: 120 }}
          mode="multiple"
          allowClear
          options={keywords}
          value={mechanics}
          onSelect={updateMechanics}
          onDeselect={updateMechanics}
          onClear={setMechanics}
          placeholder="Mechanic"
          placement="topLeft"
        />
        <Select
          allowClear
          style={{ width: 120 }}
          options={rarities}
          onSelect={setRarity}
          onClear={setRarity}
          placeholder="Rarity"
        />
        <Select
          style={{ width: 200 }}
          allowClear
          options={sets}
          onSelect={setSet}
          onClear={setSet}
          placeholder="Set"
        />
        <Select
          style={{ width: 160 }}
          allowClear
          options={classes}
          onSelect={setClassId}
          onClear={setClassId}
          placeholder="Class"
        />
      </div>
      <div className="attack_health_mana">
        <Select
          allowClear
          options={manaOptions}
          onSelect={setAttack}
          onClear={setAttack}
          placeholder="Attack"
        />
        <Select
          allowClear
          options={manaOptions}
          onSelect={setHealth}
          onClear={setHealth}
          placeholder="Health"
        />
        <Select
          allowClear
          options={manaOptions}
          onSelect={setMana}
          onClear={setMana}
          placeholder="Mana"
        />
      </div>
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
