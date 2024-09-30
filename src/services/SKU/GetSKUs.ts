import axios from "axios";
import {ResponseError} from "../../interface/ResponseError";
import SKU from "../../interface/Entity/SKU";
import Order from "../../enum/Order";

interface GetSKUsResponse {
    data: SKU[];
    totalPage: number,
    limit: number,
    offset: number,
    totalElementOfPage: number
}

interface GetSKUsProps {
    limit?: number;
    offset?: number;
    order?: Order;
    orderBy?: string;
}

const GetSKUs = async (data?: GetSKUsProps): Promise<GetSKUsResponse> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if(!token) throw new Error('Token not found');

        const response = await axios.get(`${HOST}/sku?limit=${data?.limit || 10}&offset=${data?.offset || 1}&order=${data?.order || Order.ASC}&orderBy=skuCode`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
    }catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default GetSKUs;