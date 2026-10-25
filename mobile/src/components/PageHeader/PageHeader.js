import { Text } from 'react-native';
import styles from './styles';

const PageHeader = ({ eyebrow, title, accent }) => (
  <>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text style={styles.title}>
      {title} <Text style={styles.accent}>{accent}</Text>
    </Text>
  </>
);

export default PageHeader;
