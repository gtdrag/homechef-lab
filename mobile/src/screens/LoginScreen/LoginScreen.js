import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button, ErrorMessage, PageHeader } from '../../components';
import { colors } from '../../theme';
import styles from './styles';

const LoginScreen = ({ onSignIn, isSubmitting, error }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = emailAddress.trim() !== '' && password !== '' && !isSubmitting;

  const submit = () => {
    if (canSubmit) onSignIn(emailAddress, password);
  };

  return (
    <View style={styles.container}>
      <PageHeader eyebrow="A BETTER KIND OF DINNER" title="Welcome" accent="home." />
      <Text style={styles.subtitle}>Sign in to see what’s cooking.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          accessibilityLabel="Email address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmailAddress}
          placeholder="you@example.com"
          placeholderTextColor={colors.placeholder}
          returnKeyType="next"
          style={styles.input}
          value={emailAddress}
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          accessibilityLabel="Password"
          autoCapitalize="none"
          onChangeText={setPassword}
          onSubmitEditing={submit}
          placeholder="Your password"
          placeholderTextColor={colors.placeholder}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <ErrorMessage message={error} />
        <Button title="Sign in" onPress={submit} loading={isSubmitting} disabled={!canSubmit} />
      </View>
    </View>
  );
};

export default LoginScreen;
