import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";

const url = "/api/instance/";

type LocalesResponse = {
  locales: string[];
};

function LocaleFilter({ locale, onChange }: { locale: string | null; onChange: (locale: string) => void }) {
  const { status, data, error } = useQuery({
    queryKey: ["locales"],
    queryFn: fetchApi<LocalesResponse>(url),
    select: (data) => data.locales,
  });

  // Set the first locale as default when the data is ready
  useEffect(() => {
    if (data && data.length > 0) {
      onChange(data[0]);
    }
  }, [data, onChange]);

  return (
    <div>
      <h3>Locales</h3>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" &&
        data.map((l) => (
          <label key={l}>
            <input type="radio" name="locale" value={l} checked={l === locale} onChange={() => onChange(l)} />
            {l}
          </label>
        ))}
    </div>
  );
}

export default LocaleFilter;
