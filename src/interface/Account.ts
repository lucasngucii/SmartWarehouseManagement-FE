import { Role } from "./Role";

export interface Account {
    id: string;
    username: string;
    fullName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    dateOfBirth: string;
    position: string;
    address: string;
    avatar: string;
    status: boolean;
    role: Role;
    createdAt: string;
    updatedAt: string;
    isDelete: boolean;
    createdBy: string;
}