export type HttpResponse<T> = {
    statusCode: number;
    data: T;
    message?: string;
}