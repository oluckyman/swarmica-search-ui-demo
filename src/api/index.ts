import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchApi =
  <T>(url: string) =>
  async ({ signal }: QueryFunctionContext) => {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
    return res.json() as T;
  };

/*

queryFn: async () => {
  const res = await fetch(categoriesUrl);
  if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
  return (await res.json()) as CategoriesResponse;
},


queryFn: async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
  return (await res.json()) as LocalesResponse;
},
*/
