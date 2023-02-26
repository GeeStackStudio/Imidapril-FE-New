import { useEffect, useState } from "react";
import { useAxios } from "./AxiosProvider";
import { AxiosRequestConfig } from "axios";
import useAuth from "../utils/AuthContext";

export interface IUseGetProps<Params, Response> {
  url: string;
  defaultParams?: Partial<Params>;
  defaultValue?: Response;
  axiosConfig?: AxiosRequestConfig;
}

export interface IUseGetState<Params, Response> {
  data: Response;
  errorMessage: string;
  loading: boolean;
  request: (param: Params) => Promise<Response>;
  setData: (data: Response) => any;
  setErrorMessage: (message: string) => any;
}

export default function useGet<Params, Response>(
  props: IUseGetProps<Params, Response>
): IUseGetState<Params, Response> {
  const [data, setData] = useState<Response>(props.defaultValue as Response);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axios = useAxios();
  const auth = useAuth();

  async function request(params: Params): Promise<Response> {
    try {
      const config: AxiosRequestConfig = {
        params: { ...props.defaultParams, ...params },
        ...props.axiosConfig,
      };
      if (auth.token) {
        if (!config.headers) config.headers = {};
        config.headers["Application-Token"] = auth.token;
      }
      setLoading(true);
      const res = await axios.instance.get<Response>(props.url, config);
      setData(res.data);
      setLoading(false);
      return Promise.resolve(res.data);
    } catch (e: any) {
      setErrorMessage(e.message);
      setLoading(false);
      return Promise.reject(e);
    }
  }

  return { data, errorMessage, loading, request, setData, setErrorMessage };
}
