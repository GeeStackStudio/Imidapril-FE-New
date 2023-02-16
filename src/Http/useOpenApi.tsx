import { AxiosInstance } from "axios";
import { useAxios } from "./AxiosProvider";
import { Configuration } from "../scaffold";
import { MutableRefObject, useMemo, useRef } from "react";

export interface IUseOpenApiProps<Api> {
  apiFactory: (
    configuration?: any,
    bathPath?: string,
    axios?: AxiosInstance
  ) => Api;
}

export default function useOpenApi<Api>(
  factory: new (
    configuration?: any,
    bathPath?: string,
    axios?: AxiosInstance
  ) => Api
): Api {
  const axios = useAxios();
  return new factory(undefined, axios.axiosConfig.baseURL, axios.instance);
}
