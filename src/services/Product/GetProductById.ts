import axios from "axios"
import {Product} from "../../interface/Entity/Product";
import {checkTokenExpired} from "../../util/DecodeJWT";

const GetProductById = async (productId: string): Promise<Product> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE
        const token = localStorage.getItem('token')
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }

        const response = await axios.get(`${HOST}/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const data = error.response.data
            throw new Error(data.message || "An unexpected error occurred.")
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

export default GetProductById