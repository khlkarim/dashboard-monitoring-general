'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    useEffect(() => {
      if (hasHydrated && !user) {
        router.replace('/auth/v1/login');
      }
    }, [hasHydrated, user, router]);

    if (!hasHydrated) return null; // wait until store is hydrated
    if (!user) return null; // still wait until redirect completes

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName =
    `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
}
