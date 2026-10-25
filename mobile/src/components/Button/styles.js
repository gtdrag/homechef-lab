import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  primary: { minHeight: 52, marginTop: 26, backgroundColor: colors.green },
  secondary: { minHeight: 48, marginTop: 30, borderWidth: 1, borderColor: colors.green },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryText: { color: colors.green, fontSize: 14, fontWeight: '700' },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.5 },
});
