export default {
  clearError(state) {
    state.error = '';
  },
  registerStart(state) {
    state.loading = true;
    state.success = '';
    state.error = '';
  },
  registerSuccess(state, { successMsg, token, userId, expireDate }) {
    state.loading = false;
    state.success = successMsg;
    state.error = '';
    state.token = token;
    state.userId = userId;
    state.expireDate = expireDate;
  },
  registerError(state, { errorMsg }) {
    state.loading = false;
    state.success = '';
    state.error = errorMsg;
  },
  loginStart(state) {
    state.loading = true;
    state.success = '';
    state.error = '';
  },
  loginSuccess(state, { successMsg, token, userId, expireDate }) {
    state.loading = false;
    state.success = successMsg;
    state.error = '';
    state.token = token;
    state.userId = userId;
    state.expireDate = expireDate;
  },
  loginError(state, { errorMsg }) {
    state.loading = false;
    state.success = '';
    state.error = errorMsg;
  },
  logoutStart(state) {
    state.loading = true;
    state.success = '';
    state.error = '';
  },
  logoutSuccess(state, { successMsg }) {
    state.loading = false;
    state.success = successMsg;
    state.error = '';
    state.token = null;
    state.userId = null;
    state.expireDate = null;
  },
  logoutError(state, { errorMsg }) {
    state.loading = false;
    state.success = '';
    state.error = errorMsg;
  },
};
