import axios from "axios";
import { Role } from "../../interface/Role";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    role: string;
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
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/auth/register`, data);
    return response.data;
}
