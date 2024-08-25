import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/Todocontext";
import "./App.css";
import TodoForm from "./components/Todoform";
import TodoItem from "./components/Todoitem";

function App() {
  const [todos, settodos] = useState([]);

  const addtodo = (todo) => {
    settodos((old) => [
      ...old,
      { id: Math.floor(Math.random() * 100), ...todo },
    ]);
  };
  const updatetodo = (id, todo) => {
    settodos((old) =>
      old.map((oldtodo) => (oldtodo.id === id ? todo : oldtodo))
    );
  };
  const deletetodo = (id) => {
    settodos((old) => old.filter((oldtodo) => oldtodo.id !== id));
  };

  const togglecomplete = (id) => {
    settodos((old) =>
      old.map((oldtodo) =>
        oldtodo.id === id
          ? { ...oldtodo, completed: !oldtodo.completed }
          : oldtodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, updatetodo, deletetodo, togglecomplete, addtodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}

            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
