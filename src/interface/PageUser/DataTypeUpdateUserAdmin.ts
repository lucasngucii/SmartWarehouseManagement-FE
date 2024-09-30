export default interface DataTypeUpdateUserAdmin {
    email?: string;
    password?: string;
    fullName?: string;
    phoneNumber?: string;
    roleName?: string;
    position?: string;
    address?: string;
    gender?: string;
    dateOfBirth?: string;
    avatar?: File | null;
    confirmPassword?: string;
}