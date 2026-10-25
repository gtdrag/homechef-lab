import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  container: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingTop: 30 },
  signedIn: { marginTop: 14, color: colors.muted, fontSize: 14 },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 42,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.ink,
  },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 24 },
  mealCount: { color: colors.muted, fontSize: 12 },
});
