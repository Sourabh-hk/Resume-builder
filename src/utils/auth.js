const AUTH_KEY = 'rb_session';
const USERS_KEY = 'rb_users';

export function signup({ name, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[{"id":"guest","name":"Demo User","email":"test@test.com","passwordHash":"password"}]');
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  const user = { 
    id: Math.random().toString(36).substring(2), 
    name, 
    email, 
    passwordHash: password, 
    createdAt: Date.now() 
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_KEY, JSON.stringify({ id: user.id, name, email }));
  return user;
}

export function login({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[{"id":"guest","name":"Demo User","email":"test@test.com","passwordHash":"password"}]');
  const user = users.find(u => u.email === email && u.passwordHash === password);
  if (!user) throw new Error('Invalid credentials');
  localStorage.setItem(AUTH_KEY, JSON.stringify({ id: user.id, name: user.name, email }));
  return user;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession() {
  return JSON.parse(localStorage.getItem(AUTH_KEY));
}
