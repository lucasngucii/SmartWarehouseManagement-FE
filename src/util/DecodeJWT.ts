import {jwtDecode} from "jwt-decode";
import JWTDecode from "../interface/JWTDecode";

const decodeJWT = (token: string): JWTDecode => {
    try {
        const decodeToken = jwtDecode<JWTDecode>(token);

        return {
            userId: decodeToken.userId,
            appType: decodeToken.appType,
            role: decodeToken.role,
            timestamp: decodeToken.timestamp,
            iat: decodeToken.iat,
            exp: decodeToken.exp,
        };

    } catch (error) {
        throw new Error("Invalid token.");
    }
}

export const checkTokenExpired = (token: string): boolean => {
    const decodeToken = jwtDecode<JWTDecode>(token);
    return decodeToken.exp < Date.now() / 1000;
}

export default decodeJWT;