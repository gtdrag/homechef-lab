import { Text, View } from 'react-native';
import styles from './styles';
import type { Meal } from '../../api';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

type MealRowProps = {
  meal: Meal;
  position: number;
};

const MealRow = ({ meal, position }: MealRowProps) => (
  <View style={styles.container}>
    <Text style={styles.number}>{String(position).padStart(2, '0')}</Text>
    <View style={styles.details}>
      <Text style={styles.name}>{meal.name}</Text>
      {meal.description ? <Text style={styles.description}>{meal.description}</Text> : null}
      {meal.calories != null ? <Text style={styles.calories}>{meal.calories} cal</Text> : null}
    </View>
    <Text style={styles.price}>{currencyFormatter.format(meal.price_cents / 100)}</Text>
  </View>
);

export default MealRow;
