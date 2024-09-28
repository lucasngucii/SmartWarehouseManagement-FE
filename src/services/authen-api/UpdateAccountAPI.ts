import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";

interface UpdateUserRequest {
    email?: string;
    password?: string;
    fullName?: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    position?: string;
    address?: string;
    roleName?: string;
    avatar?: string; // avatar là chuỗi base64
}

const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
        throw new Error("Invalid base64 string: MIME type could not be extracted.");
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
};

const UpdateAccountAPI = async (userId: string, userData: UpdateUserRequest): Promise<void> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Token not found.");
        }

        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            const value = userData[key as keyof UpdateUserRequest];
            if (value) {
                if (key === 'avatar' && typeof value === 'string') {
                    const file = base64ToFile(value, 'avatar.png');
                    formData.append(key, file);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        await axios.put(`${HOST}/account/ad/update/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

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
