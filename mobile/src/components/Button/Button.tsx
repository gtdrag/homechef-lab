import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '../../theme';
import styles from './styles';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
};

const spinnerColors: Record<ButtonVariant, string> = { primary: '#fff', secondary: colors.green };

const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled || loading}
    onPress={onPress}
    style={({ pressed }) => [
      styles.base,
      styles[variant],
      pressed && styles.pressed,
      disabled && styles.disabled,
    ]}
  >
    {loading ? (
      <ActivityIndicator color={spinnerColors[variant]} />
    ) : (
      <Text style={styles[`${variant}Text`]}>{title}</Text>
    )}
  </Pressable>
);

export default Button;
