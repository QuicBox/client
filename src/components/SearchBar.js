import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Update search term in parent component
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Trigger search on input change for real-time filtering
  };

  return (
    <div className="search-bar input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for companies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        <i className="fas fa-search"></i> Search
      </button>
    </div>
  );
}

export default SearchBar;
