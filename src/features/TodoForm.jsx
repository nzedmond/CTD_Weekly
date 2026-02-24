import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem 0; /* Spacing for the form */

  /* Spacing for items inside the form */
  > * {
    margin-bottom: 0.5rem;
  }
`;

const StyledButton = styled.button`
  font-style: ${props => props.disabled ? 'italic' : 'normal'};
`;

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
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="id"
        labelText="Todo"
      />
      <StyledButton disabled={!workingTodoTitle.trim() || isSaving}>
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;