import { Text } from 'react-native';
import styles from './styles';

const ErrorMessage = ({ message }) =>
  message ? (
    <Text style={styles.text} accessibilityRole="alert">
      {message}
    </Text>
  ) : null;

export default ErrorMessage;
