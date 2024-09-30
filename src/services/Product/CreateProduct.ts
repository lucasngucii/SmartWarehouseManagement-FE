import axios from "axios";
import DataTypeCreateProductAdmin from "../../interface/PageProduct/DataTypeCreateProductAdmin";
import { ResponseError } from "../../interface/ResponseError";

const CreateProduct = async (product: DataTypeCreateProductAdmin): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        const formData = new FormData();
        Object.keys(product).forEach(key => {
            const value = product[key as keyof DataTypeCreateProductAdmin];
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach((file: File) => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, value as string);
                }
            }
        });
        const response = await axios.post(`${HOST}/products`, formData, {
            headers: {
                "content-type": "multipart/form-data",
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
}

export default CreateProduct;