import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import FormDataSupplier from "../../interface/FormDataSupplier";
import {checkTokenExpired} from "../../util/DecodeJWT";

const UpdateSupplierById = async (supplierID: string, data: FormDataSupplier): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = "/login";
        } else if (checkTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            window.location.href = "/session-expired";
        }

        const response = await axios.put(`${HOST}/suppliers/${supplierID}`, data, {
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

export default UpdateSupplierById;