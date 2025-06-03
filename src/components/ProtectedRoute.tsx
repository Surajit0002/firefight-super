
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    console.log('ProtectedRoute - user:', user?.email, 'profile:', userProfile, 'loading:', loading);
  }, [user, userProfile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userProfile?.role !== 'admin') {
    console.log('Admin required but user is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
