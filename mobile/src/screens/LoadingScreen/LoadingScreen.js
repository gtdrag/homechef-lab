import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../theme';
import styles from './styles';

const LoadingScreen = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="dark" />
    <ActivityIndicator size="small" color={colors.green} />
    <Text style={styles.text}>Checking your session...</Text>
  </SafeAreaView>
);

export default LoadingScreen;
