import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const addPerson = (personObj) => {
  return axios.post(baseUrl, personObj);
};

const updatePerson = (personObj) => {
  return axios.put(`${baseUrl}/${personObj.id}`, personObj);
};

const delPerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export default { getAllPersons, addPerson, updatePerson, delPerson };
