import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";
import LocaleFilter from "./LocaleFilter";
import CategoryFilter from "./CategoryFilter";
import SearchResults from "./SearchResults";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div>
      <header style={{ background: "plum" }}>
        <SearchBar onSearch={handleSearch} />
      </header>

      <aside style={{ background: "lightyellow" }}>
        <h1>Filters</h1>
        <LocaleFilter />
        <CategoryFilter />
      </aside>

      <main style={{ background: "lightcyan" }}>
        <SearchResults query={searchQuery} />
      </main>
    </div>
  );
}

export default SearchPage;
