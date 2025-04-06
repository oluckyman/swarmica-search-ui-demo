import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchApi = <T>(url: string, params: Record<string, any> = {}) => {
  const queryParams = new URLSearchParams(params);
  const fullUrl = queryParams ? `${url}?${queryParams}` : url;
  return async ({ signal }: QueryFunctionContext): Promise<T> => {
    const res = await fetch(fullUrl, { signal });
    if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
    return res.json();
  };
};
