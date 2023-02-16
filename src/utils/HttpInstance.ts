import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { message } from "antd";

export function onResponseReject(error: any) {
  let message = "";
  if (!error.response) {
    message = "连接服务器出错，请稍后再试";
  } else {
    message = error.response.data.message;
  }
  return Promise.reject(new Error(message));
}
export function onRequestFulfilled(config: InternalAxiosRequestConfig) {
  // console.log('custom request interceptor');
  return config;
}
export default function CommonApiErrorHandler(e: Error) {
  return message.error(e.message);
}
