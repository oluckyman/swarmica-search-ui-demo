import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";
import LocaleFilter from "./LocaleFilter";
import CategoryFilter from "./CategoryFilter";
import SearchResults from "./SearchResults";
import "./styles.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locale, setLocale] = useState<string | null>(null);
  const [categories, setCategories] = useState<number[]>([]);

  const handleSearch = useCallback((nextQuery: string) => setSearchQuery(nextQuery), []);
  const handleLocaleChange = useCallback((nextLocale: string) => setLocale(nextLocale), []);
  const handleCategoriesChange = useCallback((nextCategories: number[]) => setCategories(nextCategories), []);

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] h-screen max-w-screen-lg mx-auto">
      <header className="col-span-2">
        <SearchBar isDisabled={locale === null} onSearch={handleSearch} />
      </header>

      <aside>
        <LocaleFilter locale={locale} onChange={handleLocaleChange} />
        <CategoryFilter locale={locale} categories={categories} onChange={handleCategoriesChange} />
      </aside>

      <main className="overflow-y-auto overflow-x-hidden">
        <SearchResults locale={locale} query={searchQuery} categories={categories} />
      </main>
    </div>
  );
}

export default SearchPage;
