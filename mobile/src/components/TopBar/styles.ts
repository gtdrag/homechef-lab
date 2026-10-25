import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  container: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  brandMark: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.green,
  },
  brandMarkText: { color: '#fff', fontFamily: 'Georgia', fontSize: 17 },
  brandName: { marginLeft: 10, color: colors.ink, fontSize: 17, fontWeight: '700' },
  note: { marginLeft: 'auto', color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 0.7 },
});
