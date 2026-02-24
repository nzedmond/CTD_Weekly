import React, { useState, useEffect } from 'react';
import styles from './TodosViewForm.module.css';

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
    <form className={styles.viewForm} onSubmit={preventRefresh}>
      <div className={styles.fieldGroup}>
        <label htmlFor="search-todos">Search todos:</label>
        <div className={styles.row}>
          <input
            id="search-todos"
            type="text"
            className={styles.flexGrow}
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button type="button" onClick={() => setLocalQueryString('')}>
            Clear
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.flexItem}>
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

        <div className={styles.flexItem}>
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
