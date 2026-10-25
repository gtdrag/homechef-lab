import { AppShell } from '../components';
import { MenuScreen } from '../screens';
import { useSession } from '../session';

// Route files connect session state to screens, so screens stay prop-driven and easy to test.
const MenuRoute = () => {
  const { user, meals, error, isSubmitting, signOut } = useSession();

  return (
    <AppShell>
      <MenuScreen
        user={user}
        meals={meals}
        error={error}
        isSubmitting={isSubmitting}
        onSignOut={signOut}
      />
    </AppShell>
  );
};

export default MenuRoute;
