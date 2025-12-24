import './App.css'
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title){
    const newTodo = {
      title:  title,
      id: Date.now()
    };
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App
