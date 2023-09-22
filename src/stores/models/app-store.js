import { createModel } from '@rematch/core';
import {
  addQuestion,
  doGetQuestionByUser,
  getLeaderboardInfo,
  getQuestion,
  getQuestions,
  saveQuestionAnswer,
} from 'utils/api';

const appStore = createModel()({
  state: {},

  reducers: {},

  effects: () => ({
    async doGetQuestions(questionIds) {
      return await getQuestions(questionIds);
    },
    async doGetQuestion(id) {
      return await getQuestion(id);
    },
    async doGetLeaderboardInfo() {
      return await getLeaderboardInfo();
    },
    async doAddQuestion(payload) {
      return await addQuestion(payload);
    },
    async doSaveQuestionAnswer(payload) {
      return await saveQuestionAnswer(payload);
    },
    async doGetQuestionByUser(userId) {
      return await doGetQuestionByUser(userId);
    },
  }),
});

export default appStore;
