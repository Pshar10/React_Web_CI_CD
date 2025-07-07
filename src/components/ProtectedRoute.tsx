import React from 'react';
import { useAuth } from './AuthProvider';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => window.location.reload()} />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-red-300 mb-4">Access Denied</h2>
            <p className="text-red-200 mb-4">
              You don't have permission to access this resource.
            </p>
            <p className="text-red-300 text-sm">
              Required permission: <code className="bg-red-800 px-2 py-1 rounded">{requiredPermission}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;