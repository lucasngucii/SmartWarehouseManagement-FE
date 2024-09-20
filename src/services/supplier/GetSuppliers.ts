import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import Supplier from "../../interface/Supplier";

interface GetSuppliersResponse {
    data: Supplier[];
    totalPage: number;
    limit: number;
    offset: number;
    totalElementOfPage: number;
}

const GetSuppliers = async (): Promise<GetSuppliersResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${HOST}/suppliers?limit=3&offset=1&order=ASC&orderBy=name`, {
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
};

export default GetSuppliers;