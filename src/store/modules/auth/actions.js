let timer;
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

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

    const expiresIn = +resData.expiresIn * 1000;
    // const expiresIn = +5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: expirationDate,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 10000) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      });
    }
  },
  async autoLogout(context) {
    await context.dispatch('logout');
    context.commit('logout');
  },
};
