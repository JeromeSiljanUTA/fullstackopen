import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const addPerson = (personObj) => {
  return axios.post(baseUrl, personObj);
};

export default { getAllPersons, addPerson };
