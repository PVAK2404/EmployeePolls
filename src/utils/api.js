import { _getUsers } from './_DATA.js';

async function getUser({ user, password }) {
  const users = await _getUsers();
  if (users[user]) {
    const isUser = users[user].password === password;

    if (isUser) return users[user];
  }

  throw new Error('Wrong username or password');
}

export { getUser };
