import Role from "./Role";

export default interface User {
    id: string;
    create_at: string;
    update_at: string;
    isDeleted: boolean;
    username: string;
    fullName: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    position: string;
    address: string;
    avatar: string;
    status: boolean;
    role: Role;
}