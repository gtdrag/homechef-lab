// Shapes match the Rails JSON (snake_case), so these mirror the API rather than the UI.
export type Meal = {
  id: number;
  name: string;
  description: string | null;
  price_cents: number;
  calories: number | null;
};

export type User = {
  id: number;
  email_address: string;
};

export type Account = {
  user: User;
  meals: Meal[];
};

// Default to localhost so a missing env var can never point a dev build at production.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

// Returns null for bad credentials; throws for anything unexpected.
export const createSession = async (
  emailAddress: string,
  password: string,
): Promise<string | null> => {
  const response = await fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: emailAddress, password }),
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Unable to sign in. Please try again.');

  const { token }: { token?: string } = await response.json();
  if (!token) throw new Error('The sign-in response did not include a token.');

  return token;
};

// Returns null when the token is no longer valid; throws for anything unexpected.
export const fetchAccount = async (token: string): Promise<Account | null> => {
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Unable to load your account. Please try again.');

  const user: User = await response.json();
  const mealsResponse = await fetch(`${API_URL}/meals`);
  if (!mealsResponse.ok) throw new Error('Unable to load the menu. Please try again.');

  const meals: Meal[] = await mealsResponse.json();
  return { user, meals };
};
