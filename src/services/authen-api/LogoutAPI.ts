import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";

interface LogoutResponse {
    message: string;
}

export const LogoutAPI = async (): Promise<LogoutResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token is not found");
        }

        return (await axios.post(`${HOST}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }

    }
}