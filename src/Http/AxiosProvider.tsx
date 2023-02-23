import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import useAuth from "../utils/AuthContext";
import { Config } from "../config";
export interface IAxiosContext {
  instance: AxiosInstance;
  defaultErrorHandle?: (error: Error) => any;
  axiosConfig: AxiosRequestConfig;
}
const AxiosContext = React.createContext<IAxiosContext>({} as any);

export interface IAxiosProviderProps {
  children?: any;
  onResponseReject?: (error: any) => Promise<any>;
  onRequestFulfilled?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  axiosConfig: AxiosRequestConfig;
  defaultErrorHandle?: (error: Error) => any;
}

export function useAxios(): IAxiosContext {
  return useContext(AxiosContext);
}

export default function AxiosProvider(props: IAxiosProviderProps): any {
  const auth = useAuth();
  console.log(auth);
  const instance = useMemo(() => {
    const res = axios.create(props.axiosConfig);
    res.interceptors.response.use(
      (response) => response,
      props.onResponseReject
    );
    res.interceptors.request.use(props.onRequestFulfilled);
    // todo： 删除any
    res.interceptors.request.use((config: any) => {
      config.headers = {
        ...config.headers,
        "Application-Version": Config.version,
      };
      // if (auth.isLogin) {
      config.headers = {
        ...config.headers,
        "Application-Token": "5244a3e1-f074-4952-b88c-68d9957bbcee",
      };
      // }
      return config;
    });
    return res;
  }, [auth.token]);

  return (
    <AxiosContext.Provider
      value={{
        instance,
        defaultErrorHandle: props.defaultErrorHandle,
        axiosConfig: props.axiosConfig,
      }}
    >
      {props.children}
    </AxiosContext.Provider>
  );
}
