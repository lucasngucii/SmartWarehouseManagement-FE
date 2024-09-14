import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";

interface Account {
    id: string;
    username: string;
    fullname: string;
    email: string;
    roleName: string;
    status: string;
    phoneNumber: string;
}

interface ResponseGetAccounts {
    accounts: Account[];
}

export const GetAccountsAPI = async (): Promise<ResponseGetAccounts> => {

    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Token not found.");
        }

        const response = await axios.get(`${HOST}/account/ad`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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