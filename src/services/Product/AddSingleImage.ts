import axios from "axios";
import {ResponseError} from "../../interface/ResponseError";

const AddSingleImage = async (productId: string, images: File[]) => {
    try {
        const HOST = process.env.REACT_APP_API_HOST;
        const token = localStorage.getItem('token');

        if (!token) throw new Error('Token not found')

        const formData = new FormData();
        images.forEach(image => {
            formData.append('image', image);
        });

        const response = await axios.post(`${HOST}/product-detail/images/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export default AddSingleImage;