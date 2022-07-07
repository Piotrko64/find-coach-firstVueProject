export default {
  showRequests(state, _getters, _rootState, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.showRequests && !!state.requests.length;
  },
};
