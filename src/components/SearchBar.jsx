import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar py-4">
      <input
        className="rounded-md px-4 py-2 w-full bg-zinc-100"
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
