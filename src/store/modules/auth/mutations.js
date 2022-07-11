export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
  logout(state) {
    state.token = null;
    state.userId = null;
    state.tokenExpiration = null;
  },
};
