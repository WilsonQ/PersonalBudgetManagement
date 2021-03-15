import axios from "axios";
import { userData, getUser } from "../auth/authentication";
const query = "http://localhost:3001/api/";

export const getOperations = async () => {
  console.log("me llamaron");
  let res = await axios.get(`${query}operations`);
  let data = res.data[0].user_operation[0];
  console.log("quien yo esto es lo que tengo", data);
  return {
    data: data,
    state: res.status,
  };
};

export const getOperationsList = async () => {
  console.log("me llamaron");
  let res = await axios.get(`${query}operations`);
  let data = res.data;
  console.log("data", data);
  return {
    data: res.data,
    state: res.status,
  };
};
export const searchOperation = async (str) => {
  console.log("Search", str.str);
  let res = await axios.get(`${query}operations/search/${str.str}`);
  let data = res.data;
  console.log("data", data);
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
  let res = await axios.post(`${query}operations`, operation);
  let data = res.data;
  console.log(res);
  return res.status;
};
export const updateOperation = async (operation) => {
  console.log("UpdateOperation", operation);
  const { operation_id } = operation;

  let res = await axios.put(`${query}operations/${operation_id}`, operation);
  console.log(res);
  return res.status;
};
export const updateCategory = async (category) => {
  if (category) {
    console.log("UpdateCategory", category);
    const { category_id } = category;
    console.log("que tiene categoria", category_id);

    let res = await axios.put(`${query}categories/${category_id}`, category);
    console.log(res);
    return res.status;
  } else {
    return 400;
  }
};
export const createCategory = async (category) => {
  if (category) {
    console.log("que tiene categoria", category);

    let res = await axios.post(`${query}categories`, category);
    console.log(res);
    return res.status;
  } else {
    return 400;
  }
};
export const removeOperation = async (operation_id, removeCategory) => {
  console.log("revoveOperation", operation_id, removeCategory);

  let res = await axios.delete(`${query}operations/${operation_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      remove: removeCategory,
    },
  });
  // let data = res.data;
  console.log(res);
  // return res.status;
};
export const removeCategory = async (category_id) => {
  console.log("revoveCategory", category_id);

  let res = await axios.delete(`${query}categories/${category_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      removeDirect: true,
    },
  });
  // let data = res.data;
  console.log(res);
  // return res.status;
};
