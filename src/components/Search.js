import React, { useState } from "react";

function Search( {onSearch} ) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Pass the search term to the parent component (AccountContainer)
    onSearch(term);
  }

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
