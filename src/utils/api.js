import _ from 'lodash';

import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js';

async function signIn({ user, password }) {
  const users = await _getUsers();
  if (users[user]) {
    const isUser = users[user].password === password;

    if (isUser) return users[user];
  }

  throw new Error('Wrong username or password');
}

async function getQuestions(questionIds) {
  const allQuestions = await _getQuestions();
  const questions = questionIds.map((id) => allQuestions[id]);

  const newQuestions = Object.values(_.omit(allQuestions, questionIds));

  return { questions, newQuestions };
}

async function doGetQuestionByUser(userId) {
  const users = await _getUsers();

  return { answers: users[userId].answers, questions: users[userId].questions };
}

async function getLeaderboardInfo() {
  const users = await _getUsers();

  return Object.values(users).map((user) => ({ ...user, key: user.id }));
}

async function addQuestion(question) {
  return await _saveQuestion(question);
}

async function saveQuestionAnswer(payload) {
  return await _saveQuestionAnswer(payload);
}

async function getQuestion(id) {
  const [allQuestions, allUsers] = await Promise.all([
    _getQuestions(),
    _getUsers(),
  ]);

  return {
    ...allQuestions[id],
    avatarURL: allUsers[allQuestions[id].author].avatarURL,
  };
}

async function getAllQuestions() {
  return await _getQuestions();
}

export {
  addQuestion,
  doGetQuestionByUser,
  getAllQuestions,
  getLeaderboardInfo,
  getQuestion,
  getQuestions,
  saveQuestionAnswer,
  signIn,
};
