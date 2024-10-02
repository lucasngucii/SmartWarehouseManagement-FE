import axios from "axios";
import { ResponseError } from "../../../interface/ResponseError";
import {checkTokenExpired} from "../../../util/DecodeJWT";

interface Brand {
    id: string;
    name: string;
    description: string;
}

const GetBrandsByName = async (name: string): Promise<Brand[]> => {

    try {
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }

        const response = await axios.get(`${HOST}/brands/name?name=${name}`, {
            headers: {
                'Authorization': `Bearer ${token}`
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

export default GetBrandsByName;