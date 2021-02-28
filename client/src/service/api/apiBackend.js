import axios from "axios";
import { userData, getUser } from "../auth/authentication";
const query = "http://localhost:3001/api/";

export const getOperations = async () => {
  console.log("me llamaron");
  let res = await axios.get(`${query}operations`);
  let data = res.data;
  console.log("quien yo esto es lo que tengo", data);
  return {
    data: res.data,
    state: res.status,
  };
};

export const getOperationsList = async () => {
  console.log("me llamaron");
  let res = await axios.get(`${query}operations`);
  let data = res.data;
  console.log("quien yo esto es lo que tengo", data);
  return {
    data: res.data,
    state: res.status,
  };
};

export const getCategories = async () => {
  let res = await axios.get(`${query}categories`);
  let data = res.data;
  console.log("result", data);
  return {
    data: res.data,
    state: res.status,
  };
};

export const createOperation = async (operation) => {
  console.log("createOperation", operation);
  await getUser();
  console.log(userData());
  let res = await axios.post(`${query}operations`, operation);
  let data = res.data;
  await console.log(res);
  return res.status;
};
