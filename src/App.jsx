import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // TODO: Create a state called 'todos' initialized with an array of 3 strings.
  // Hint: const [todos, setTodos] = useState(["Item 1", "Item 2", ...]);

  // __________________________________________________________________ <--- WRITE CODE HERE
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my-todo-list");
    if (saved) {
      return JSON.parse(saved);
    }
    return ["Item 1", "Item 2", "Item 3"];
  });
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(todos));
  }, [todos]);
  function addTodo() {
    if (inputValue == "") return;
    setTodos([...todos, inputValue]);
    setInputValue("");
  }
  function deleteTodo(indexToDelete) {
    const newTodo = todos.filter((_, index) => index != indexToDelete);
    setTodos(newTodo);
  }
  return (
    <div>
      <h1>My Tasks</h1>

      <div className="input-group">
        <input type="text" placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addTodo();
            }
          }} />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {/* We will render the list here next */}
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            < button className="delete-btn" onClick={() => deleteTodo(index)}> x</button>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default App