import axios from "axios";
import { Role } from "../../interface/Role";
import { ResponseError } from "../../interface/ResponseError";

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

    try {

        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Not found session token.");
        }

        const response = await axios.post(`${HOST}/auth/register`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An error occurred during registration.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
