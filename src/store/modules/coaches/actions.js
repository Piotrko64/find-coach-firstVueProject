export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://coach-54ae2-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    await response.json();

    if (!response.ok) {
      alert('error');
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },
};
