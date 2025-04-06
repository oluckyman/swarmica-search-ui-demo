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
    if (locale === null && status === "success" && data.length > 0) {
      onChange(data[0]);
    }
  }, [data, locale, status, onChange]);

  return (
    <div className="filter-block">
      <h3 className="filter-label">Locales</h3>
      <div className="flex gap-3">
        {status === "pending" && <div>Loading...</div>}
        {status === "error" && <div>Error: {error.message}</div>}
        {status === "success" &&
          data.map((l) => (
            <label key={l}>
              <input
                className="mr-2"
                tabIndex={3}
                type="radio"
                name="locale"
                value={l}
                checked={l === locale}
                onChange={() => onChange(l)}
              />
              {l}
            </label>
          ))}
      </div>
    </div>
  );
}

export default LocaleFilter;
