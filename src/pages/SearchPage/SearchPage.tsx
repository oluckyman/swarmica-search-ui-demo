import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";
import LocaleFilter from "./LocaleFilter";
import CategoryFilter from "./CategoryFilter";
import SearchResults from "./SearchResults";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locale, setLocale] = useState<string | null>(null);

  const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
  const handleLocaleChange = useCallback((nextLocale: string) => setLocale(nextLocale), []);

  return (
    <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr] h-screen">
      <header className="col-span-2" style={{ background: "plum" }}>
        <SearchBar onSearch={handleSearch} />
      </header>

      <aside style={{ background: "lightyellow" }}>
        <h1>Filters</h1>
        <LocaleFilter locale={locale} onChange={handleLocaleChange} />
        <CategoryFilter locale={locale} />
      </aside>

      <main style={{ background: "lightcyan" }}>
        <SearchResults query={searchQuery} />
      </main>
    </div>
  );
}

export default SearchPage;
