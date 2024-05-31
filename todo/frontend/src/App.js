import axios from "axios";
import React, { useState, useEffect } from "react";

const Tasks = ({ todo, onDelete }) => {
  return (
    <div className="w-full border-t-2 py-2 px-1 flex justify-between text-sm items-center">
      <span>{todo.task}</span>
      <div
        className="flex justify-center cursor-pointer text-white items-center bg-gray-500 w-6 h-6 rounded-full"
        onClick={() => onDelete(todo._id)}
      >
        <span>x</span>
      </div>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/add", { task: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="w-[30%] border p-5 flex flex-col justify-center items-center space-y-2">
        <h1 className="font-semibold text-lg">
          You have <span>{todos.length}</span> Todos
        </h1>
        <div className="flex w-full flex-col">
          {todos.map((todo) => (
            <Tasks key={todo._id} todo={todo} onDelete={handleDelete} />
          ))}
        </div>
        <form className="flex justify-between w-full" onSubmit={handleAdd}>
          <input
            required
            type="text"
            className="w-[80%] border"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="border px-2 py-1">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
