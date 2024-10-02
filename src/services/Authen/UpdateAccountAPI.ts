import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import DataTypeUpdateUserAdmin from "../../interface/PageUser/DataTypeUpdateUserAdmin";
import User from "../../interface/Entity/User";
import {checkTokenExpired} from "../../util/DecodeJWT";

const UpdateAccountAPI = async (userId: string, dataUpdateUser: DataTypeUpdateUserAdmin): Promise<User> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');
        const END_SESSION_ENDPOINT = process.env.REACT_APP_END_SESSION_ENDPOINT;
        if (!token || checkTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = END_SESSION_ENDPOINT as string;
        }
        const formData = new FormData();
        Object.keys(dataUpdateUser).forEach(key => {
            const value = dataUpdateUser[key as keyof DataTypeUpdateUserAdmin];
            if (value) {
                formData.append(key, value);
            }
        });
        const resposne = await axios.put(`${HOST}/account/ad/update/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
        return resposne.data.data as User;
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

export default UpdateAccountAPI;
