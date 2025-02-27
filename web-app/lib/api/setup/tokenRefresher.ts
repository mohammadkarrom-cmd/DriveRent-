import { REFRESH_TOKEN } from '../../../app/constants';
import { privateAxiosInstance, setHeaderToken } from './api';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { endpoints } from '../../../app/api/common';
import { paths } from '@/app/components/layout/config-nav';
import { redirect } from 'next/navigation';

type tokenType = {
  token: string
}
export const fetchNewToken = async (): Promise<string | null> => {
  //# get the refresh token
  const refreshToken = JSON.parse(window.localStorage.getItem(REFRESH_TOKEN)) as tokenType;  

  //# try to fetch new access token and return it
  try {
    const accessToken = await privateAxiosInstance.post<{ access: string }>(
      endpoints.auth.refreshToken,
      {
        refresh: refreshToken?.token
      }
    ).then(res => res.data.access);

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh the access token', error);
    window.localStorage.removeItem(REFRESH_TOKEN)
    redirect(paths.login);
  }
};

export const refreshToken = async (failedRequest: AxiosError): Promise<string | void> => {
  //# try to fetch new access token
  const newToken = await fetchNewToken();

  //$ check if the token fetched
  if (newToken) {
    //! set the prev failed request authorization header
    if (failedRequest.config) {
      (failedRequest.config as AxiosRequestConfig).headers = {
        ...(failedRequest.config.headers || {}),
        Authorization: `Bearer ${newToken}`
      };
    }
    //! set axios instance authorization header 
    setHeaderToken(newToken);
    return Promise.resolve(newToken);
  } else {
    return Promise.reject();
  }
};
