import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchApi = <T>(url: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams(params);
  const fullUrl = queryParams ? `${url}?${queryParams}` : url;
  return async ({ signal }: QueryFunctionContext) => {
    const res = await fetch(fullUrl, { signal });
    if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
    return res.json() as T;
  };
};
