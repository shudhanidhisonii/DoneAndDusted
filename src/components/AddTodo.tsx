import React, { useState } from "react";
import { useTodos } from "../store/TodosContext";

const AddTodo = () => {
  const { handleAddToDo } = useTodos();
  const [task, setTask] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      handleAddToDo(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
