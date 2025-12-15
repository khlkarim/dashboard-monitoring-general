export enum RoleEnum {
    administrator = 1,
    president = 2,
    member = 3,
    alumni = 4,
}

export type RoleName = keyof typeof RoleEnum;
