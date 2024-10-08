import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from './Contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally, render a loading indicator
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to home page if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}