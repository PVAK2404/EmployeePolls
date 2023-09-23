import { _saveQuestion, _saveQuestionAnswer } from './_DATA.js';

describe('_saveQuestion', () => {
  const question = {
    optionOneText: 'CR7 is Goal of soccer',
    optionTwoText: 'M10 is Goal of soccer',
    author: 'zoshikanlu',
  };

  test('returns saved question with all expected fields populated', async () => {
    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion.optionOne).toEqual(
      expect.objectContaining({
        votes: expect.arrayContaining([]),
        text: question.optionOneText,
      }),
    );
    expect(savedQuestion.optionTwo).toEqual(
      expect.objectContaining({
        votes: expect.arrayContaining([]),
        text: question.optionTwoText,
      }),
    );
    expect(savedQuestion.author).toBe(question.author);
  });

  test('throws an error when optionOneText is missing', async () => {
    const invalidQuestion = { ...question, optionOneText: undefined };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });

  test('throws an error when optionTwoText is missing', async () => {
    const invalidQuestion = { ...question, optionTwoText: undefined };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });

  test('throws an error when author is missing', async () => {
    const invalidQuestion = { ...question, author: undefined };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });
});

describe('_saveQuestionAnswer', () => {
  const questionAnswer = {
    authedUser: 'mtsamis',
    qid: 'am8ehyc8byjqgar0jgpub9',
    answer: 'optionOne',
  };

  test('return true with all expected fields populated', async () => {
    const result = await _saveQuestionAnswer(questionAnswer);

    expect(result).toBe(true);
  });

  test('throws an error when authedUser is missing', () => {
    return expect(
      _saveQuestionAnswer({ ...questionAnswer, authedUser: undefined }),
    ).rejects.toMatch('Please provide authedUser, qid, and answer');
  });

  test('throws an error when qid is missing', () => {
    return expect(
      _saveQuestionAnswer({ ...questionAnswer, qid: undefined }),
    ).rejects.toMatch('Please provide authedUser, qid, and answer');
  });

  test('throws an error when answer is missing', () => {
    return expect(
      _saveQuestionAnswer({ ...questionAnswer, answer: undefined }),
    ).rejects.toMatch('Please provide authedUser, qid, and answer');
  });
});
