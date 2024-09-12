import axios from "axios";

interface LogoutResponse {
    message: string;
}

export const LogoutAPI = async (): Promise<LogoutResponse> => {
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
}