import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../TopBar';
import styles from './styles';

const AppShell = ({ children }) => (
  <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TopBar />
        {children}
        <Text style={styles.footer}>Made with care, served with ease.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default AppShell;
