type RoleTypes = "user" | "admin";

export interface UserTypes {
    id: string;
    email: string;
    role: RoleTypes;
}
