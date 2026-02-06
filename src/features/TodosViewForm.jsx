import React, { useState, useEffect } from 'react';

export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <form className="view-form" onSubmit={preventRefresh}>
      <div className="input-group">
        <label htmlFor="search-todos">Search todos:</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="search-todos"
            type="text"
            style={{ flexGrow: 1 }}
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button type="button" className="dismiss-btn" onClick={() => setLocalQueryString('')}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="input-group" style={{ flex: '1 1 200px' }}>
          <label htmlFor="sort-field">Sort by</label>
          <select
            id="sort-field"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </div>

        <div className="input-group" style={{ flex: '1 1 150px' }}>
          <label htmlFor="sort-direction">Direction</label>
          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </form>
  );
}
