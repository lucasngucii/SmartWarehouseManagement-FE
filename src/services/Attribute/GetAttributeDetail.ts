import axios from "axios";
import AttributeDetailType from "../../interface/AttributeDetail";
import { ResponseError } from "../../interface/ResponseError";
import returnNameAttribute from "../../util/ReturnNameAttribute";
import Order from "../../enum/Order";
import {checkTokenExpired} from "../../util/DecodeJWT";

interface GetAttributeDetailResponse {
    data: AttributeDetailType[];
    totalPage: number;
    limit: number;
    offset: number;
    totalElementOfPage: number;
}

interface GetAttributeDetailProps {
    id: number;
    limit?: number;
    offset?: number;
    order?: Order;
    orderBy?: string;
}

const GetAttributeDetail = async (data: GetAttributeDetailProps): Promise<GetAttributeDetailResponse> => {

    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }

        if (returnNameAttribute(data.id) === "") {
            throw new Error("Attribute is not found");
        }

        const response = await axios.get(`${HOST}/${returnNameAttribute(data.id)}?limit=${data?.limit || 10}&offset=${data?.offset || 1}&order=${data?.order || Order.ASC}&orderBy=${data?.orderBy || "name"}`, {
            headers: {
                Authorization: `Bearer ${token}`
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

export default GetAttributeDetail;
