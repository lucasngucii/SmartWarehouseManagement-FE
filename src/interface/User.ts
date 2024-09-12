export interface User {
    id: number;
    username: string;
    fullName: string;
    role: string;
    email: string;
    phoneNumber: string;
    password?: string;
    confirmPassword?: string;
}