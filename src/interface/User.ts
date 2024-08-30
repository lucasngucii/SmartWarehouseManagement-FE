export interface User {
    username: string;
    fullName: string;
    group: string;
    status: boolean;
    email: string;
    phoneNumber: string;
    password?: string;
    confirmPassword?: string;
}