import axios from "axios";
import { checkTokenExpired } from "../../util/DecodeJWT";

export interface ReceiveItemCheckGoodsApi {
    receiveItemId: string;
    receiveQuantity: string;
    missingQuantity: string;
    damagedQuantity: string;
    status: string;
    notes: string;
    serverity: string,
    actionTaken: string
}

export interface CreateReceiveCheckProps {
    receiveId: string;
    receiveDate: string;
    description: string;
    receiveBy: string;
    supplierId: string;
    receiveItems: ReceiveItemCheckGoodsApi[];
}

const CreateReceiveCheck = async (data: CreateReceiveCheckProps): Promise<void> => {
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

        await axios.post(`${HOST}/receive-check`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('profile');
                window.location.href = "/session-expired";
            }
            const data = error.response.data
            throw new Error(data.message || "An unexpected error occurred.")
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

export default CreateReceiveCheck;