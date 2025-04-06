import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchApi =
  <T>(url: string) =>
  async ({ signal }: QueryFunctionContext) => {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
    return res.json() as T;
  };
