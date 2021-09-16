export default {
  loading(state) {
    return state.loading;
  },
  success(state) {
    return state.success;
  },
  error(state) {
    return state.error;
  },
  token(state) {
    return state.token;
  },
  userId(state) {
    return state.userId;
  },
  expireDate(state) {
    return state.expireDate;
  },
  isAuth(state) {
    return !!(state.token && state.userId && Date.now() < state.expireDate);
  },
};
