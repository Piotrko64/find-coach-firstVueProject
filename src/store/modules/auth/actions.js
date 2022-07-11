export default {
  async login(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  logout(context) {
    context.commit('logout');
  },
  async auth(context, payload) {
    const { mode } = payload;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEYFIREBASE}`;
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_KEYFIREBASE}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const resData = await response.json();
    if (!response.ok) {
      const error = new Error(resData.message || 'FAILED');
      throw error;
    }
    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      });
    }
  },
};
