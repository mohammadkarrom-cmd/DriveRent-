"use client"

import  { useEffect } from 'react';
import { privateAxiosInstance } from './api';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshToken } from './tokenRefresher';

const ClientSideInterceptor = () => {
  useEffect(() => {
    createAuthRefreshInterceptor(privateAxiosInstance, refreshToken, {
      statusCodes: [401],
      pauseInstanceWhileRefreshing: true
    });
    
  }, []);

  return null; // This component doesn't render anything
};

export default ClientSideInterceptor;
