import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { RoleEnum } from '../types/roles.types';

export const useRole = () => {
    const user = useAuthStore((state) => state.user);

    // Assuming the user object has a nested role object as per the schema: user.role.id
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
        isAdmin: roleId === RoleEnum.administrator,
        isPresident: roleId === RoleEnum.president,
        isMember: roleId === RoleEnum.member,
        isAlumni: roleId === RoleEnum.alumni,
    };
};
