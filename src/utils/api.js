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

const countOccurrences = (arr, target) => {
  return arr.reduce((count, element) => {
    return count + (element.author === target ? 1 : 0);
  }, 0);
};

async function getLeaderboardInfo() {
  const [allUsers, allQuestions] = await Promise.all([
    _getUsers(),
    _getQuestions(),
    _,
  ]);

  return Object.values(allUsers).map((user) => {
    const created = countOccurrences(Object.values(allQuestions), user.id);

    return { ...user, key: user.id, created };
  });
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

  if (!allQuestions[id]) throw new Error('404');

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
