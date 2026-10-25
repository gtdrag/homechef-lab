import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  container: { width: '100%', maxWidth: 460, alignSelf: 'center', paddingTop: 32 },
  subtitle: { marginTop: 12, color: colors.muted, fontSize: 15 },
  form: { marginTop: 38 },
  label: {
    marginTop: 18,
    marginBottom: 8,
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    color: colors.ink,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
