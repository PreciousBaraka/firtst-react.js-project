import React from "react";

function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default SearchBar;
