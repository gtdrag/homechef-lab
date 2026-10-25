const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const createSession = async (emailAddress, password) => {
  const response = await fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: emailAddress, password }),
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Unable to sign in. Please try again.');

  const { token } = await response.json();
  if (!token) throw new Error('The sign-in response did not include a token.');

  return token;
};

export const fetchAccount = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Unable to load your account. Please try again.');

  const user = await response.json();
  const mealsResponse = await fetch(`${API_URL}/meals`);
  if (!mealsResponse.ok) throw new Error('Unable to load the menu. Please try again.');

  return { user, meals: await mealsResponse.json() };
};
