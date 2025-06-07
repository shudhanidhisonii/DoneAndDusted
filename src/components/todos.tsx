import { useTodos } from "../store/TodosContext";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();

  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");

  let filteredTodos = todos;

  if (todosData === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (todosData === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <ul className="main-task">
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onChange={() => toggleTodoAsCompleted(todo.id)}
          />
          <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

          {todo.completed && (
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Todos;
