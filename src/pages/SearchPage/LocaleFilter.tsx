import { useQuery } from "@tanstack/react-query";

const url = "/api/instance/";

type LocalesResponse = {
  locales: string[];
};

function LocaleFilter() {
  const { status, data, error } = useQuery({
    queryKey: ["locales"],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
      return (await res.json()) as LocalesResponse;
    },
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
