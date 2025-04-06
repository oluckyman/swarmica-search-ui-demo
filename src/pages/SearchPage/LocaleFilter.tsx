import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";

const url = "/api/instance/";

type LocalesResponse = {
  locales: string[];
};

function LocaleFilter() {
  const { status, data, error } = useQuery({
    queryKey: ["locales"],
    queryFn: fetchApi<LocalesResponse>(url),
    select: (data) => data.locales,
  });

  return (
    <div>
      <h3>Locales</h3>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && JSON.stringify(data)}
    </div>
  );
}

export default LocaleFilter;
