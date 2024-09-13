import axios from "axios";
import { Role } from "../../interface/Role";

interface GetRolesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Role[];
}

export const GetRolesAPI = async (): Promise<GetRolesResponse> => {
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
}