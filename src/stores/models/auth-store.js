import { createModel } from '@rematch/core';
import { getUser } from 'utils/api';

const authStore = createModel()({
  state: {
    userInfo: null,
    isUserAuthenticated: false,
  },

  reducers: {
    setUserInfo: (state, userInfo) => ({
      ...state,
      userInfo,
    }),
    setIsUserAuthenticated: (state, isUserAuthenticated) => ({
      ...state,
      isUserAuthenticated,
    }),
  },

  effects: (dispatch) => ({
    async doSignUp(payload) {
      const userInfo = await getUser(payload);

      dispatch.authStore.setUserInfo(userInfo);
      dispatch.authStore.setIsUserAuthenticated(true);
    },
  }),
});

export default authStore;
