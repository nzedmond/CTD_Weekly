import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import React, { useEffect, useState, useCallback } from 'react';

/* =======================
   Constants
======================= */

const BASE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const AIRTABLE_HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
  'Content-Type': 'application/json',
};

/* =======================
   Helpers
======================= */

const normalizeTodo = (record) => ({
  id: record.id,
  ...record.fields,
  isCompleted: record.fields.isCompleted ?? false,
});

const fetchAirtable = async (url, options) => {
  const resp = await fetch(url, options);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}`);
  }
  return resp.json();
};

const optimisticUpdate = async ({
  snapshot,
  setState,
  optimisticState,
  apiCall,
  rollbackMessage,
  setErrorMessage,
}) => {
  setState(optimisticState);
  try {
    await apiCall();
  } catch (error) {
    setErrorMessage(`${error.message}. ${rollbackMessage}`);
    setState(snapshot);
  }
};

/* =======================
   Component
======================= */

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${BASE_URL}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  /* ---------- Fetch ---------- */

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAirtable(encodeUrl(), {
          method: 'GET',
          headers: AIRTABLE_HEADERS,
        });

        setTodoList(data.records.map(normalizeTodo));
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  /* ---------- Create ---------- */

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    try {
      setIsSaving(true);
      const data = await fetchAirtable(BASE_URL, {
        method: 'POST',
        headers: AIRTABLE_HEADERS,
        body: JSON.stringify(payload),
      });

      const savedTodo = normalizeTodo(data.records[0]);
      setTodoList((prev) => [...prev, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------- Complete ---------- */

  const completeTodo = async (id) => {
    const snapshot = [...todoList];
    const optimisticState = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );

    setIsSaving(true);
    await optimisticUpdate({
      snapshot,
      setState: setTodoList,
      optimisticState,
      apiCall: () =>
        fetchAirtable(BASE_URL, {
          method: 'PATCH',
          headers: AIRTABLE_HEADERS,
          body: JSON.stringify({
            records: [{ id, fields: { isCompleted: true } }],
          }),
        }),
      rollbackMessage: 'Reverting todo...',
      setErrorMessage,
    });
    setIsSaving(false);
  };

  /* ---------- Update ---------- */

  const updateTodo = async (editedTodo) => {
    const snapshot = [...todoList];
    const optimisticState = todoList.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );

    setIsSaving(true);
    await optimisticUpdate({
      snapshot,
      setState: setTodoList,
      optimisticState,
      apiCall: () =>
        fetchAirtable(BASE_URL, {
          method: 'PATCH',
          headers: AIRTABLE_HEADERS,
          body: JSON.stringify({
            records: [
              {
                id: editedTodo.id,
                fields: {
                  title: editedTodo.title,
                  isCompleted: editedTodo.isCompleted,
                },
              },
            ],
          }),
        }),
      rollbackMessage: 'Reverting todo...',
      setErrorMessage,
    });
    setIsSaving(false);
  };

  /* ---------- Render ---------- */

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        isLoading={isLoading}
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      <hr />
      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
