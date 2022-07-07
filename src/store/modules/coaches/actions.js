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
      `https://coach-54ae2-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
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
  async loadCoaches(context) {
    const response = await fetch(
      `https://coach-54ae2-default-rtdb.europe-west1.firebasedatabase.app/coacheas.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(response.mesage || 'Failed to fetch');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
  },
};
