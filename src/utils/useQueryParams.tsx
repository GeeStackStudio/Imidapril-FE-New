import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function useQueryParams() {
  const [urlSearchParams, setUrlSearchParams] = useState<URLSearchParams>();
  const params = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(params.search);
    setUrlSearchParams(urlParams);
  }, [params.search]);
  return {
    urlSearchParams: urlSearchParams,
  };
}
