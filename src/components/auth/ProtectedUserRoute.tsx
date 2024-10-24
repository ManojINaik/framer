import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../lib/store';

interface ProtectedUserRouteProps {
  children: React.ReactNode;
}

export default function ProtectedUserRoute({ children }: ProtectedUserRouteProps) {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}