import axios from "axios";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    role: string;
}

const LoginAPI = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        return (await axios.post(`${HOST}/auth/login`, loginRequest)).data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error("Invalid username or password.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default LoginAPI;