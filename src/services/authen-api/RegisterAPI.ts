import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import { FormDataUser } from "../../interface/FormDataUser";

const RegisterAPI = async (data: FormDataUser): Promise<void> => {

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
