import React from "react";

const SearchPatientResults = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-patient-results">
      <div className="searchcontainer">
        <input
          id="search"
          type="text"
          placeholder="🔎 busca por nombre o documento..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchPatientResults;

