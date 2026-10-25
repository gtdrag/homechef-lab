import { Text, View } from 'react-native';
import { Button, ErrorMessage, MealRow, PageHeader } from '../../components';
import styles from './styles';

const MenuScreen = ({ user, meals, error, isSubmitting, onSignOut }) => (
  <View style={styles.container}>
    <PageHeader eyebrow="YOUR HOME MENU" title="Dinner," accent="handled." />
    <Text style={styles.signedIn}>Signed in as {user.email_address}</Text>

    <View style={styles.header}>
      <Text style={styles.sectionTitle}>On the menu</Text>
      <Text style={styles.mealCount}>
        {meals.length} {meals.length === 1 ? 'dish' : 'dishes'}
      </Text>
    </View>

    {meals.map((meal, index) => (
      <MealRow key={meal.id} meal={meal} position={index + 1} />
    ))}

    <ErrorMessage message={error} />
    <Button title="Sign out" variant="secondary" onPress={onSignOut} loading={isSubmitting} />
  </View>
);

export default MenuScreen;
