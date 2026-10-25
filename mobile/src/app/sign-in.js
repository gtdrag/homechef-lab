import { AppShell } from '../components';
import { LoginScreen } from '../screens';
import { useSession } from '../session';

const SignInRoute = () => {
  const { error, isSubmitting, signIn } = useSession();

  return (
    <AppShell>
      <LoginScreen onSignIn={signIn} isSubmitting={isSubmitting} error={error} />
    </AppShell>
  );
};

export default SignInRoute;
