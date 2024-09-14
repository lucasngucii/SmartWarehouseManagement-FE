import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import { Permission } from "../../interface/Permission";

interface GetProfileByTokenAPIResponse {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: boolean;
    role: Permission;
}

export const GetProfileByTokenAPI = async (token: string): Promise<GetProfileByTokenAPIResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const response = await axios.get(`${HOST}/account/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}