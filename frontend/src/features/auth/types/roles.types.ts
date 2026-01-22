export enum RoleEnum {
    ADMINISTRATOR = 'administrator',
    PRESIDENT = 'president',
    MEMBER = 'member',
    ALUMNI = 'alumni',
}

export type RoleName = keyof typeof RoleEnum;
