import axios from "axios";
import { Role } from "../../interface/Role";
import { ResponseError } from "../../interface/ResponseError";

interface GetRolesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Role[];
}

export const GetRolesAPI = async (): Promise<GetRolesResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token is not found");
        }

        const response = await axios.get(`${HOST}/auth/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }

    }
}