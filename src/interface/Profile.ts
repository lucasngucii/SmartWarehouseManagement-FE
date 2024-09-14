import { Permission } from "./Permission";

export interface Profile {
    id: number;
    fullName: string;
    username: string;
    email: string;
    role: Permission;
    status: boolean;
}