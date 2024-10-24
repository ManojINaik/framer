import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../lib/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const admin = useAdminStore((state) => state.admin);

  if (!admin?.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}