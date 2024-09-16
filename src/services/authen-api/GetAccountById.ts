import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import { Account } from "../../interface/Account";

const GetAccountById = async (userId: string): Promise<Account> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Token not found.");
        }

        const response = await axios.get(`${HOST}/account/ad/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default GetAccountById;