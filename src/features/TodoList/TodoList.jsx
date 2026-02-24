import TodoListItem from "./TodoListItem";

function TodoList({ todoList, isLoading, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter(
    // todo => !todo.isCompleted
    todo => todo?.isCompleted === false,
  );

  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;

