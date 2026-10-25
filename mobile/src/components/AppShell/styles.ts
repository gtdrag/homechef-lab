import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  footer: {
    marginTop: 'auto',
    paddingVertical: 26,
    color: colors.muted,
    fontFamily: 'Georgia',
    fontSize: 12,
  },
});
