import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from './src/theme';
import TopBar from './src/components/TopBar';
import MealRow from './src/components/MealRow';

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
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
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

  const signIn = async () => {
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
      setPassword('');
    } catch (signInError) {
      setError(signInError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function signOut() {
    setIsSubmitting(true);
    setError('');

    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setToken(null);
      setUser(null);
      setMeals([]);
      setPassword('');
    } catch {
      setError('Unable to sign out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isRestoring) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar style="dark" />
        <ActivityIndicator size="small" color={colors.green} />
        <Text style={styles.loadingText}>Checking your session...</Text>
      </SafeAreaView>
    );
  }

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
            <View style={styles.content}>
              <Text style={styles.eyebrow}>YOUR HOME MENU</Text>
              <Text style={styles.title}>
                Dinner, <Text style={styles.titleAccent}>handled.</Text>
              </Text>
              <Text style={styles.signedIn}>Signed in as {user.email_address}</Text>

              <View style={styles.menuHeader}>
                <Text style={styles.sectionTitle}>On the menu</Text>
                <Text style={styles.mealCount}>
                  {meals.length} {meals.length === 1 ? 'dish' : 'dishes'}
                </Text>
              </View>

              {meals.map((meal, index) => (
                <MealRow key={meal.id} meal={meal} position={index + 1} />
              ))}

              {error ? (
                <Text style={styles.errorMessage} accessibilityRole="alert">
                  {error}
                </Text>
              ) : null}
              <Pressable
                accessibilityRole="button"
                disabled={isSubmitting}
                onPress={signOut}
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={colors.green} />
                ) : (
                  <Text style={styles.secondaryButtonText}>Sign out</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.loginContent}>
              <Text style={styles.eyebrow}>A BETTER KIND OF DINNER</Text>
              <Text style={styles.title}>
                Welcome <Text style={styles.titleAccent}>home.</Text>
              </Text>
              <Text style={styles.subtitle}>Sign in to see what’s cooking.</Text>

              <View style={styles.form}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <TextInput
                  accessibilityLabel="Email address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmailAddress}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="next"
                  style={styles.input}
                  value={emailAddress}
                />

                <Text style={styles.label}>PASSWORD</Text>
                <TextInput
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  onChangeText={setPassword}
                  onSubmitEditing={signIn}
                  placeholder="Your password"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                />

                {error ? (
                  <Text style={styles.errorMessage} accessibilityRole="alert">
                    {error}
                  </Text>
                ) : null}

                <Pressable
                  accessibilityRole="button"
                  disabled={isSubmitting || !emailAddress.trim() || !password}
                  onPress={signIn}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    (isSubmitting || !emailAddress.trim() || !password) && styles.buttonDisabled,
                  ]}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>Sign in</Text>
                  )}
                </Pressable>
              </View>
            </View>
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
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: colors.background,
  },
  loadingText: { color: colors.muted, fontSize: 14 },
  loginContent: { width: '100%', maxWidth: 460, alignSelf: 'center', paddingTop: 32 },
  content: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingTop: 30 },
  eyebrow: {
    marginBottom: 14,
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 46, lineHeight: 54 },
  titleAccent: { color: colors.coral, fontStyle: 'italic' },
  subtitle: { marginTop: 12, color: colors.muted, fontSize: 15 },
  signedIn: { marginTop: 14, color: colors.muted, fontSize: 14 },
  form: { marginTop: 38 },
  label: {
    marginTop: 18,
    marginBottom: 8,
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    color: colors.ink,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  primaryButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 4,
  },
  secondaryButtonText: { color: colors.green, fontSize: 14, fontWeight: '700' },
  buttonPressed: { opacity: 0.82 },
  buttonDisabled: { opacity: 0.5 },
  errorMessage: { marginTop: 14, color: '#A23F32', fontSize: 13 },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 42,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.ink,
  },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 24 },
  mealCount: { color: colors.muted, fontSize: 12 },
  footer: {
    marginTop: 'auto',
    paddingVertical: 26,
    color: colors.muted,
    fontFamily: 'Georgia',
    fontSize: 12,
  },
});
