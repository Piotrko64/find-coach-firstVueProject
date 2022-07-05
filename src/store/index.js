import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';

export const store = createStore({
  modules: {
    coaches: coachesModule,
  },
});
