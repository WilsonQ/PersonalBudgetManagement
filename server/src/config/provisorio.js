const state = { user: {} };

export const userData = () => state.user;

export const setUser = (nextUser) => {
  state.user = nextUser;
};
