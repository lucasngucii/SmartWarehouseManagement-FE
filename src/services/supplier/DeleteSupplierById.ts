import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";

const DeleteSupplierById = async (supplierID: string): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${HOST}/suppliers/${supplierID}`, {
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

export default DeleteSupplierById;