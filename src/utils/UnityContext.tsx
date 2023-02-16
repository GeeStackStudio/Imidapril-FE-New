import { createContext, MutableRefObject } from "react";

export const UnityContext = createContext<{
  iframe: MutableRefObject<HTMLIFrameElement> | null;
  setIframe: (v: HTMLIFrameElement) => any;
}>({
  iframe: null,
  setIframe: () => {
    return;
  },
});
