import { Permission } from "./Permission";

export interface Profile {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: boolean;
    role: Permission;
}