import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  container: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  number: { width: 24, color: colors.coral, fontFamily: 'Georgia', fontSize: 14, fontStyle: 'italic' },
  details: { flex: 1, paddingVertical: 15 },
  name: { color: colors.ink, fontFamily: 'Georgia', fontSize: 18 },
  description: { marginTop: 4, color: colors.muted, fontSize: 12 },
  calories: { marginTop: 4, color: colors.muted, fontSize: 11 },
  price: { color: colors.ink, fontSize: 14, fontWeight: '700' },
});
