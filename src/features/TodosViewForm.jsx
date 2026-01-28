import React from 'react';

export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search-todos">Search todos:</label>
        <input
          id="search-todos"
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>

      <div>
        <label htmlFor="sort-field">Sort by</label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

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
    </form>
  );
}
