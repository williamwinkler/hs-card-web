import axios from "axios";

const url = "http://localhost:3030";

class HsCardClient {
  async GetCards() {
    try {
      const res = await axios.get(url + "/cards?type=4&limit=8");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  async GetSets() {
    try {
      const res = await axios.get(url + "/sets");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  async GetTypes() {
    try {
      const res = await axios.get(url + "/types");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  async GetClasses() {
    try {
      const res = await axios.get(url + "/classes");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  async GetKeywords() {
    try {
      const res = await axios.get(url + "/keywords");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  async GetRarities() {
    try {
      const res = await axios.get(url + "/rarities");
      return res.data;
    } catch (err) {
      console.log("Error: " + err);
    }
  }
}

export default new HsCardClient();
