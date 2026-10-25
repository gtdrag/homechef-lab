import { Text } from 'react-native';
import styles from './styles';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  accent: string;
};

const PageHeader = ({ eyebrow, title, accent }: PageHeaderProps) => (
  <>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text style={styles.title}>
      {title} <Text style={styles.accent}>{accent}</Text>
    </Text>
  </>
);

export default PageHeader;
