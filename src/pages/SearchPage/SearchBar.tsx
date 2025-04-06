import { useState } from "react";

function SearchBar({ onSearch }: { onSearch: (searchQuery: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="p-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value);
        }}
      >
        <input
          className="flex-1 border border-gray-300 rounded-md px-4 py-2"
          autoFocus
          type="search"
          placeholder="Search for articles…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 rounded-md border border-gray-300 px-4 py-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
