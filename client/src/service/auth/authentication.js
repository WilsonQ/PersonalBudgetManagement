import axios from "axios";
const state = { isAuth: true };
const query = "http://localhost:3001/api/";

export const isAuthenticated = () => state.isAuth;
export const userData = () => state.user;

export const setIsAuth = (nextIsAuth) => {
  console.log("porque", nextIsAuth);
  state.isAuth = nextIsAuth;
};
const setUser = (nextUser) => {
  console.log("porque", nextUser);
  state.user = nextUser;
};

export const registerUser = async (user) => {
  console.log("payload", user);
  let res = await axios.post(`${query}users/register`, user);
  let data = res.data;
  await getUser();
  console.log(res);
  return res.status;
};
export const loginUser = async (user) => {
  console.log("payload", user);
  let res = await axios.post(`${query}users/login`, user);
  let data = res.data;
  console.log(res);
  return res.status;
};
export const logoutUser = async (user) => {
  console.log("payload", user);
  if (state.isAuth) {
    let res = await axios.get(`${query}users/logout`);
    let data = res.data;
    console.log(data);
    return res.status;
  } else {
    return {
      status: 400,
      message: "Please Log In",
    };
  }
};

export const getUser = async () => {
  let res = await axios.get(`${query}users/data`);
  console.log("USER - Data", res);
  setUser(res.data);
};
