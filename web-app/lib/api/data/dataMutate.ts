
import  { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { METHODS, MethodsType, privateAxiosInstance } from '../setup/api';

const dataMutate = async (url: string, method: MethodsType, formData: FormData | object, AxiosOptions?: AxiosRequestConfig) => {
    let response: AxiosResponse;

    try {
        switch (method) {
            case METHODS.POST:
                response = await privateAxiosInstance.post(url, formData, { ...AxiosOptions });
                break;
            case METHODS.PUT:
                response = await privateAxiosInstance.put(url, formData, { ...AxiosOptions });
                break;
            case METHODS.PATCH:
                response = await privateAxiosInstance.patch(url, formData, { ...AxiosOptions });
                break;
            case METHODS.DELETE:
                response = await privateAxiosInstance.delete(url, { ...AxiosOptions });
                break;
            case METHODS.GET:
                response = await privateAxiosInstance.get(url, { ...AxiosOptions });
                break;
            default:
                throw new Error('no method provided or invalid method')
        }

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error
        } else {
            console.log('An unknown error occurred');
        }
    }
}

export default dataMutate

export async function fetchImageAsBlob(imageUrl: string) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
  