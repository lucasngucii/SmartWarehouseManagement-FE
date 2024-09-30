import axios from "axios";
import DataTypeUpdateProductAdmin from "../../interface/PageProduct/DataTypeUpdateProductAdmin";
import {Product} from "../../interface/Entity/Product";

const UpdateProductByProductId = async (productId: string, dataUpdate: DataTypeUpdateProductAdmin) :Promise<Product> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if(!token) throw new Error('Token not found');

        const response = await axios.put(`${HOST}/products/${productId}`, dataUpdate, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default UpdateProductByProductId;