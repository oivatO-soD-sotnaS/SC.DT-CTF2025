import { AuthProvider } from '../contexts/AuthContext';
import Forum from '../components/Forum';

export default function Home() {
  return (
    <AuthProvider>
      <Forum />
    </AuthProvider>
  );
}
