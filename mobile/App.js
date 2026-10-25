import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { LoadingScreen, LoginScreen, MenuScreen } from './src/screens';
import { colors } from './src/theme';
import { TopBar } from './src/components';

const API_URL = 'https://homechef-lab-gdrag-5772e4ad85f4.herokuapp.com/api';
const TOKEN_KEY = 'token';

const fetchAccount = async (token) => {
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

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
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

        setToken(storedToken);
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
      const response = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: emailAddress, password }),
      });

      if (response.status === 401) {
        setError('Invalid email or password');
        return;
      }
      if (!response.ok) throw new Error('Unable to sign in. Please try again.');

      const { token: newToken } = await response.json();
      if (!newToken) throw new Error('The sign-in response did not include a token.');

      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      const account = await fetchAccount(newToken);

      if (!account) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setError('Your session expired. Please sign in again.');
        return;
      }

      setToken(newToken);
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
      setToken(null);
      setUser(null);
      setMeals([]);
    } catch {
      setError('Unable to sign out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRestoring) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TopBar />

          {token && user ? (
            <MenuScreen
              user={user}
              meals={meals}
              error={error}
              isSubmitting={isSubmitting}
              onSignOut={signOut}
            />
          ) : (
            <LoginScreen onSignIn={signIn} isSubmitting={isSubmitting} error={error} />
          )}

          <Text style={styles.footer}>Made with care, served with ease.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  footer: {
    marginTop: 'auto',
    paddingVertical: 26,
    color: colors.muted,
    fontFamily: 'Georgia',
    fontSize: 12,
  },
});
