import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0; /* Spacing for the form */
`;

const StyledFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0; /* Spacing for the items */
`;

const StyledRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StyledFlexGrow = styled.input`
  flex-grow: 1;
`;

const StyledFlexItem = styled.div`
  flex: 1 1 200px;
`;

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
    <StyledForm onSubmit={preventRefresh}>
      <StyledFieldGroup>
        <label htmlFor="search-todos">Search todos:</label>
        <StyledRow>
          <StyledFlexGrow
            as="input"
            id="search-todos"
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button type="button" onClick={() => setLocalQueryString('')}>
            Clear
          </button>
        </StyledRow>
      </StyledFieldGroup>

      <StyledRow>
        <StyledFlexItem>
          <label htmlFor="sort-field">Sort by</label>
          <select
            id="sort-field"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </StyledFlexItem>

        <StyledFlexItem>
          <label htmlFor="sort-direction">Direction</label>
          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </StyledFlexItem>
      </StyledRow>
    </StyledForm>
  );
}
