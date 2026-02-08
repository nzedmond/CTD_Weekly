import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";


function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef("");
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();


    onAddTodo({ title: workingTodoTitle, isCompleted: false });
    setWorkingTodoTitle("");

    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="id"
        labelText="Todo"
      />
      <button className="add-btn" disabled={!workingTodoTitle.trim()}>{isSaving ? "Saving..." : "Add Todo"}</button>
    </form>
  );
}

export default TodoForm;