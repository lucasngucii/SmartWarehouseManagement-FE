import axios from "axios";

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    role: string;
}

interface Permission {
    id: string;
    createAt: string;
    updateAt: string;
    createBy: string;
    isDeleted: boolean;
    name: string;
    description: string;
}


interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}

interface RegisterResponse {
    id: string;
    username: string;
    password: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: Role;
    createAt: string;
    updateAt: string;
    createBy: string;
    isDeleted: boolean;
    status: boolean;
}

export const RegisterAPI = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const HOST = process.env.REACT_APP_API_HOST;
    const response = await axios.post(`${HOST}/auth/register`, data);
    return response.data;
}
