import axios from "axios";
import {ResponseError} from "../../interface/ResponseError";
import {checkTokenExpired} from "../../util/DecodeJWT";

interface VerifyTokenResponse {
    userId: string;
    appType: string;
    role: string;
    timeStamp: string;
    iat: number;
    exp: number;
}

const VerifyToken = async (): Promise<VerifyTokenResponse> => {
    try {
        const HOST = process.env.REACT_APP_API_HOST;
        const token = localStorage.getItem("token");
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }

        const response = await axios.post(`${HOST}/auth/verify-token`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export default VerifyToken;