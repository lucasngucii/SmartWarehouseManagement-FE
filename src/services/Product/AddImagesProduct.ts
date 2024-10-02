import axios from "axios";
import {ResponseError} from "../../interface/ResponseError";

const AddImagesProduct = async (productId: string, images: File[]): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) throw new Error('Token not found')

        const formData = new FormData();
        images.forEach(image => {
            formData.append('image', image);
        });

        await axios.put(`${HOST}/product-detail/images/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default AddImagesProduct;