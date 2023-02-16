import { useEffect, useState } from "react";
import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { useAxios } from "./AxiosProvider";
import useOpenApi from "./useOpenApi";

type OpenApiRequestPostMethod<Params, Response> = (
  params: Params
) => AxiosPromise<Response>;
type OpenApiRequestGetMethod<Params extends any[], Response> = (
  ...args: Params
) => AxiosPromise<Response>;

export interface IUseOpenApiRequestState<Response> {
  data?: Response;
  errorMessage: string;
  loading: boolean;
  setData: (data?: Response) => any;
  setErrorMessage: (message: string) => any;
}

export interface IUseOpenApiRequestPostState<Params, Response>
  extends IUseOpenApiRequestState<Response> {
  request: (param: Params) => Promise<Response>;
  requestSync: (param: Params) => void;
}

export interface IUseOpenApiRequestGetState<Params extends any[], Response>
  extends IUseOpenApiRequestState<Response> {
  request: (...param: Params) => Promise<Response>;
  requestSync: (...param: Params) => void;
}

export function useOpenApiFpRequest<Params, Response, Api>(
  Fp: new (
    configuration?: any,
    bathPath?: string,
    axios?: AxiosInstance
  ) => Api,
  requestMethod: OpenApiRequestPostMethod<Params, Response>,
  defaultValue?: Response,
  defaultParams?: Partial<Params>
): IUseOpenApiRequestPostState<Params, Response> {
  const [data, setData] = useState<Response | undefined>(
    defaultValue as Response
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axios = useAxios();
  const fp: any = useOpenApi(Fp);
  async function request(params: Params): Promise<Response> {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = (await fp[requestMethod.name]({
        ...defaultParams,
        ...params,
      })) as { data: Response };
      setData(res.data);
      setLoading(false);
      return Promise.resolve(res.data);
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
      return Promise.reject(e);
    }
  }
  function requestSync(params: Params) {
    request(params)
      .then()
      .catch((e) => {
        console.log(axios.defaultErrorHandle);
        if (axios.defaultErrorHandle) {
          axios.defaultErrorHandle(e);
          console.log(e.message);
        }
      });
  }
  return {
    data,
    errorMessage,
    loading,
    request,
    requestSync,
    setData,
    setErrorMessage,
  };
}
