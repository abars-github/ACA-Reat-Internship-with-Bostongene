import { useState } from "react";
import Todo from "./Todo";



const generateId = () => Date.now();



const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });  


  const totalCountOfTodos = todos.length;
  const countOfCompletedTodos = todos.filter((item) => item.isDone).length;
  const countOfUncompletedTodos = todos.filter((item) => item.isDone === false).length;

  
  const [inputValue, setInputValue] = useState("");
  const [filterTodos, setFilterTodos] = useState("");

  const filteredTodos = todos.filter(todo =>
    todo.value.toLowerCase().includes(filterTodos.toLowerCase())
  );
  

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const handeleStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const clearStorageData = () =>{
    localStorage.clear();
  }
  const addTodo = () => {
    if (inputValue) {
      let todo = {
        value: inputValue,
        id: generateId(),
        isDone: false
      };
      setTodos([...todos, todo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const markDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    );
  };

  const editValue = (id, value) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="Write Your Todos...."
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      <button onClick={clearStorageData}>Clear Data</button>
      <button onClick={addTodo}>Add</button>
      <button onClick={handeleStorage}>Save Data</button>
      <div>
        <p>Total Todos: {totalCountOfTodos}</p>
        <p>Not Completed Todos: {countOfUncompletedTodos}</p>
        <p>Completed Todos: {countOfCompletedTodos}</p>
      </div>
      <input placeholder="Filter Todos..." 
      onChange={(e) => setFilterTodos(e.target.value)}
      type="text"
      ></input>
      {todos.map((todo) => (
        <Todo
          {...todo}
          deleteTodo={deleteTodo}
          markDone={markDone}
          editValue={editValue}
          handeleStorage={handeleStorage}
          clearStorageData={clearStorageData}
        />
      ))}
    </div>
  );
};

export default TodoList;
