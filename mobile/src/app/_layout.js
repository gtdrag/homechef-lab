import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SessionProvider, useSession } from '../session';

// Keep the native splash up until the stored session has been checked.
SplashScreen.preventAutoHideAsync();

// Renders nothing; only exists to hide the splash once restoring finishes.
const SplashScreenController = () => {
  const { isRestoring } = useSession();

  useEffect(() => {
    if (!isRestoring) SplashScreen.hide();
  }, [isRestoring]);

  return null;
};

// Auth gate: a screen only exists while its guard is true, so signing in or out
// moves between routes with no manual navigation.

// Signing in or out swaps state, not depth, so cross-fade instead of the push slide.
const authTransition = { animation: 'fade', animationDuration: 200 };
const RootNavigator = () => {
  const { user } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="index" options={authTransition} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="sign-in" options={authTransition} />
      </Stack.Protected>
    </Stack>
  );
};

// useSession only works below SessionProvider, so the hooks live in the children above.
const RootLayout = () => (
  <SessionProvider>
    <SplashScreenController />
    <RootNavigator />
  </SessionProvider>
);

export default RootLayout;
