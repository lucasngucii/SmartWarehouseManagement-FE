import axios from "axios";
import { ResponseError } from "../../../interface/ResponseError";

interface Color {
    id: string;
    name: string;
    description: string;
}

const GetColorsByName = async (name: string): Promise<Color[]> => {

    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) throw new Error('Token not found');

        const response = await axios.get(`${HOST}/colors/name?name=${name}`, {
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

export default GetColorsByName;