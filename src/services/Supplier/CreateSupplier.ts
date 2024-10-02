import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import {checkTokenExpired} from "../../util/DecodeJWT";

interface CreateSupplierProps {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    supplierCode: string;
    contactPerson: string;
    location: string;
    notes: string;
    website: string;
    taxId: string;
    status: boolean;
    isActive: boolean;
}

const CreateSupplier = async (data: CreateSupplierProps): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }
        const response = await axios.post(`${HOST}/suppliers`, data, {
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

export default CreateSupplier;