import { createModel } from '@rematch/core';
import { signIn } from 'utils/api';

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
      const userInfo = await signIn(payload);

      dispatch.authStore.setUserInfo({
        id: userInfo.id,
        name: userInfo.name,
        avatarURL: userInfo.avatarURL,
      });
      dispatch.authStore.setIsUserAuthenticated(true);
    },
  }),
});

export default authStore;
