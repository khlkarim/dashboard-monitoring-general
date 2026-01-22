import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { RoleEnum } from '../types/roles.types';

export const useRole = () => {
    const user = useAuthStore((state) => state.user);

    const roleId = user?.role?.id;
    const roleName = user?.role?.name;

    const hasRole = useCallback((requiredRole: RoleEnum) => {
        return roleId === requiredRole;
    }, [roleId]);

    const hasAnyRole = useCallback((requiredRoles: RoleEnum[]) => {
        if (!roleId) return false;
        return requiredRoles.includes(roleId as RoleEnum);
    }, [roleId]);

    return {
        roleId,
        roleName,
        hasRole,
        hasAnyRole,
        isAdmin: roleId === RoleEnum.ADMINISTRATOR,
        isPresident: roleId === RoleEnum.PRESIDENT,
        isMember: roleId === RoleEnum.MEMBER,
        isAlumni: roleId === RoleEnum.ALUMNI,
    };
};
