import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContextProvider } from '../context/AuthContext';
import '../styles/globals.css';

const noAuthRequired = ["/", "/index"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp