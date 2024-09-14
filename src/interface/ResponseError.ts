export interface ResponseError {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
    error: string;
}