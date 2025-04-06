import { useState } from "react";

function SearchBar({ isDisabled, onSearch }: { isDisabled: boolean; onSearch: (searchQuery: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className={`p-4 ${isDisabled ? "opacity-60" : ""}`}>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value);
        }}
        role="search"
      >
        <input
          disabled={isDisabled}
          tabIndex={1}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-lg"
          autoFocus
          type="search"
          placeholder="Search for articles…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          disabled={isDisabled}
          tabIndex={2}
          type="submit"
          className={`bg-gray-100 text-gray-800 px-4 py-2 rounded border border-gray-300 ${!isDisabled && "hover:bg-gray-200 active:bg-gray-300"}`}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
