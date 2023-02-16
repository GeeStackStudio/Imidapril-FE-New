import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "./AxiosProvider";
import useAuth from "../utils/AuthContext";
export interface IUsePostProps<Params, Response> {
  url: string;
  defaultParams?: Partial<Params>;
  axiosConfig?: AxiosRequestConfig;
}
export interface IUsePostState<Params, Response> {
  data?: Response;
  errorMessage: string;
  loading: boolean;
  request: (param: Params) => Promise<Response>;
  setData: (data: Response) => any;
  setErrorMessage: (message: string) => any;
}

export default function usePost<Params, Response>(
  props: IUsePostProps<Params, Response>
): IUsePostState<Params, Response> {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axios = useAxios();
  const auth = useAuth();
  async function request(params: Params): Promise<Response> {
    try {
      setLoading(true);
      const config: AxiosRequestConfig = { ...props.axiosConfig };
      if (auth.token) {
        if (!config.headers) config.headers = {};
        config.headers["Application-Token"] = auth.token;
      }
      setLoading(true);
      const res = await axios.instance.post<Response>(
        props.url,
        { ...props.defaultParams, ...params },
        config
      );
      setData(res.data);
      setLoading(false);
      return Promise.resolve(res.data);
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
      return Promise.reject(e);
    }
  }
  return { data, errorMessage, loading, request, setData, setErrorMessage };
}
