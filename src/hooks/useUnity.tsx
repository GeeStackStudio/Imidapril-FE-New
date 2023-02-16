import { MutableRefObject } from "react";

export function useUnity(iframe?: MutableRefObject<HTMLIFrameElement> | null) {
  return {
    sendMessage: function (object?: string, message?: any, params?: any) {
      const data = {
        target: "UnityMessage",
        data: {
          object: object,
          data: message,
          params: params,
        },
      };
      if (iframe?.current && iframe?.current.contentWindow) {
        const enc = new TextEncoder();
        iframe.current.contentWindow?.postMessage(data, "*");
      }
    },
  };
}
