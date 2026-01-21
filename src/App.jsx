import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import React, {useEffect, useState} from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            "Authorization": token
          }
        };

        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const data = await resp.json();
        // console.log(data); // debugging line
        const mappedTodos = data.records.map(record => {
          
          const todo = {
            id: record.id,
            // title: record.fields.title,
            ...record.fields,
          };
          // console.log(todo); // debugging line
          if(todo.isCompleted === undefined){
            todo.isCompleted = false;
          };
          // console.log(todo); // debugging line
          return todo;
        });
        console.log(mappedTodos); // debugging line
        setTodoList(mappedTodos);
        
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [])

  function addTodo(title) {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false
    };
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = todoList.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: true
        };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map(todo => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList isLoading={isLoading} todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;

