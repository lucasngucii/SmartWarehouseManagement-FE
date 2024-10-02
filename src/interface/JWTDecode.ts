import {JwtPayload} from "jwt-decode";

export default interface JWTDecode extends JwtPayload {
    userId: string;
    appType: string;
    role: string;
    timestamp: number;
    iat: number;
    exp: number;
}