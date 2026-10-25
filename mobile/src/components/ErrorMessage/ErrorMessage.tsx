import { Text } from 'react-native';
import styles from './styles';

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) =>
  message ? (
    <Text style={styles.text} accessibilityRole="alert">
      {message}
    </Text>
  ) : null;

export default ErrorMessage;
