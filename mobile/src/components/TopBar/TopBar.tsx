import { Text, View } from 'react-native';
import styles from './styles';

const TopBar = () => (
  <View style={styles.container}>
    <View style={styles.brandMark}><Text style={styles.brandMarkText}>h.</Text></View>
    <Text style={styles.brandName}>homechef</Text>
    <Text style={styles.note}>GOOD FOOD, READY WHEN YOU ARE</Text>
  </View>
);

export default TopBar;
