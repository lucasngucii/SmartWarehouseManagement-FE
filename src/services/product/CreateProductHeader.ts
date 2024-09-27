import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import ProductHeader from "../../interface/ProductHeader";

interface CreateProductHeaderResponse {
    name: string;
    description: string;
    productCode: string;
    unit: string;
    category: {
        id: string;
        name: string;
        description: string;
    };
    id: string;
    createdAt: string;
    updatedAt: string;
    createBy: string;
    isDeleted: boolean;
}

const CreateProductHeader = async (data: ProductHeader): Promise<CreateProductHeaderResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) throw new Error('Token not found');

        const response = await axios.post(`${HOST}/products`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data.data;

    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default CreateProductHeader;