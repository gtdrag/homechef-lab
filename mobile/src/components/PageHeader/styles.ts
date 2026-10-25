import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  eyebrow: {
    marginBottom: 14,
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 46, lineHeight: 54 },
  accent: { color: colors.coral, fontStyle: 'italic' },
});
