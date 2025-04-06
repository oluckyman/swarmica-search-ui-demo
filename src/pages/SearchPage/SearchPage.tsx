import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";
import LocaleFilter from "./LocaleFilter";
import CategoryFilter from "./CategoryFilter";
import SearchResults from "./SearchResults";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locale, setLocale] = useState<string | null>(null);
  const [categories, setCategories] = useState<number[]>([]);

  const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
  const handleLocaleChange = useCallback((nextLocale: string) => setLocale(nextLocale), []);
  const handleCategoriesChange = useCallback((nextCategories: number[]) => setCategories(nextCategories), []);

  return (
    <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr] h-screen">
      <header className="col-span-2">
        <SearchBar onSearch={handleSearch} />
      </header>

      <aside style={{ background: "lightyellow" }}>
        <h1>Filters</h1>
        <LocaleFilter locale={locale} onChange={handleLocaleChange} />
        <CategoryFilter locale={locale} categories={categories} onChange={handleCategoriesChange} />
      </aside>

      <main style={{ background: "lightcyan" }}>
        <SearchResults locale={locale} query={searchQuery} categories={categories} />
      </main>
    </div>
  );
}

export default SearchPage;
