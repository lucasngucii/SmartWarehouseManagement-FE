import axios from "axios";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        token: string;
        role: string;
    }
}

export const LoginAPI = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    return axios.post(`${HOST}/auth/login`, loginRequest);
}