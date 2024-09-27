import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import ProductDetail from "../../interface/ProductDetail";

const CreateProductDetail = async (productId: string, productDetail: ProductDetail) => {
    try {

        if (!productId) throw new Error('Product ID is not found');

        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) throw new Error('Token not found');

        axios.post(`${HOST}/product-detail/${productId}`, productDetail, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

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

export default CreateProductDetail;