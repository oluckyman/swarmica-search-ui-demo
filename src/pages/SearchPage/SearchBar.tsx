import { useState } from "react";

function SearchBar({ onSearch }: { onSearch: (searchQuery: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value);
        }}
      >
        <input
          autoFocus
          type="search"
          placeholder="Search for articles…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
