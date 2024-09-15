import { Role } from "./Role";

export interface Account {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: Role;
    status: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    isDelete: boolean;
    createdBy: string;
}