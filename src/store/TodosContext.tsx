import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";


// Provider props
export type TodosProviderProps = {
  children: ReactNode;
};

// Todo structure
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

// Context value type
export type TodosContextType = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};

// ✅ Create the context
export const TodosContext = createContext<TodosContextType | null>(null);

// ✅ Correct spelling: TodosProvider (not TodosProvideer)
export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem("todos") || "[]";
      return JSON.parse(saved) as Todo[];
    } catch {
      return [];
    }
  });

  // ✅ Add a new todo
  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // ✅ Toggle completion
  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // ✅ Delete a todo
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <TodosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

// ✅ Custom hook
export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
