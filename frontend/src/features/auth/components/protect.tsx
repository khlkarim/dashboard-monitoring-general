import React from 'react';
import { RoleEnum } from '../types/roles.types';
import { useRole } from '../hooks/useRole';

interface ProtectProps {
    children: React.ReactNode;
    allowedRoles: RoleEnum[];
    fallback?: React.ReactNode;
}

export const Protect: React.FC<ProtectProps> = ({
    children,
    allowedRoles,
    fallback = null
}) => {
    const { hasAnyRole } = useRole();

    if (hasAnyRole(allowedRoles)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
