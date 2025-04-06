import LocaleFilter from "./LocaleFilter";
import CategoryFilter from "./CategoryFilter";

function SearchPage() {
  return (
    <div>
      <header style={{ background: "plum" }}>Search Bar</header>

      <aside style={{ background: "lightyellow" }}>
        <h1>Filters</h1>
        <LocaleFilter />
        <CategoryFilter />
      </aside>

      <main style={{ background: "lightcyan" }}>Search results</main>
    </div>
  );
}

export default SearchPage;
