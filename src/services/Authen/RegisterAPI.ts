import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import DataTypeCreateUserAdmin from "../../interface/PageUser/DataTypeCreateUserAdmin";
import {checkTokenExpired} from "../../util/DecodeJWT";

const RegisterAPI = async (data: DataTypeCreateUserAdmin | null): Promise<void> => {

    try {

        if (!data) throw new Error("Data is empty.");

        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }

        const response = await axios.post(`${HOST}/auth/register`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data.data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An error occurred during registration.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default RegisterAPI;
