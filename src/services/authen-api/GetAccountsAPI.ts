import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import { Account } from "../../interface/Account";

enum OrderBy {
    Username = "username",
    FullName = "fullName",
    Email = "email",
    RoleName = "roleName",
    Status = "status",
    PhoneNumber = "phoneNumber",
}

enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

const GetAccountsAPI = async (limit?: number, offset?: number, order?: Order, orderBy?: OrderBy): Promise<Account[]> => {

    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Token not found.");
        }

        const response = await axios.get(`${HOST}/account/ad?limit=${limit || 10}&offset=${offset || 1}&order=${order || "ASC"}&orderBy=${orderBy || "fullName"}`, {
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

export default GetAccountsAPI;