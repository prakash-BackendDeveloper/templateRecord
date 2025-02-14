import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="search">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
      />
    </form>
  );
};

export default SearchItem;
