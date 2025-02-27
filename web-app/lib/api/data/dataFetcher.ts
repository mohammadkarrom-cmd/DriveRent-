import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { privateAxiosInstance } from '../setup/api';

// type AxiosErrorResponse = {
//     response?: {
//         data?: unknown;
//         status?: number;
//         [key: string]: unknown;
//     };
//     message?: string;
// }

const fetchApi = async (url: string, AxiosOptions: AxiosRequestConfig = {}): Promise<AxiosResponse<unknown, unknown>> => {
    try {
        const response = await privateAxiosInstance.get(url, { ...AxiosOptions });
        return response
    } catch (error) {
        throw error
    }
}

export default fetchApi