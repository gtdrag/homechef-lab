import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { createSession, fetchAccount } from '../api';

const TOKEN_KEY = 'token';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Should meals move to TanStack Query once more screens fetch data (meal detail, orders)?
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const [isRestoring, setIsRestoring] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;

    const restoreSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (!storedToken) return;

        const account = await fetchAccount(storedToken);
        if (!isActive) return;

        if (!account) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          return;
        }

        setUser(account.user);
        setMeals(account.meals);
      } catch (restoreError) {
        if (isActive) setError(restoreError.message);
      } finally {
        if (isActive) setIsRestoring(false);
      }
    };

    restoreSession();
    return () => {
      isActive = false;
    };
  }, []);

  const signIn = async (emailAddress, password) => {
    setIsSubmitting(true);
    setError('');

    try {
      const newToken = await createSession(emailAddress, password);
      if (!newToken) {
        setError('Invalid email or password');
        return;
      }

      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      const account = await fetchAccount(newToken);

      if (!account) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setError('Your session expired. Please sign in again.');
        return;
      }

      setUser(account.user);
      setMeals(account.meals);
    } catch (signInError) {
      setError(signInError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setUser(null);
      setMeals([]);
    } catch {
      setError('Unable to sign out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SessionContext value={{ user, meals, error, isRestoring, isSubmitting, signIn, signOut }}>
      {children}
    </SessionContext>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession must be used inside SessionProvider');
  return session;
};
