import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) {
      user.getIdToken().then(function(token) {
        return fetch('http://localhost:8080/api/generateCustomToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });
      })
      .then(response => response.json())
      .then(data => {
        const customToken = data.customToken;
        window.postMessage({ type: 'AUTH_MESSAGE', customToken }, '*');
      })
      .catch(function(error) {
        // Handle error
        console.error('Error obtaining custom token:', error);
      });
    } else {
      window.postMessage({ type: 'AUTH_MESSAGE', signOut: true }, '*');
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
