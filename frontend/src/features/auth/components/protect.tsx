"use client";

import React from 'react';
import { useRole } from '../hooks/use-role';
import { RoleEnum } from '../../users/types/roles.types';

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
