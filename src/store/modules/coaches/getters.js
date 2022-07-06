export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return !!state.coaches.length;
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
};
