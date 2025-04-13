import { useEffect, useState, useRef } from "react";
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

  const filteredTodos = () => {
    if(filterTodos.length >= 3){
        return todos.filter(todo =>
        todo.value.toLowerCase().includes(filterTodos.toLowerCase()))
      }
      return todos;
  }
  const visibleTodos = filteredTodos();
  
  

  const handleChange = (e) => {
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
      const now = new Date().toLocaleDateString();
      let todo = {
        value: inputValue,
        id: generateId(),
        isDone: false,
        createdAt: now,
        updatedAt: null
      };
      setTodos([...todos, todo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const confirmation = window.confirm("Are you sure to delete this Todo");
    if(confirmation){
      setTodos(todos.filter((item) => item.id !== id)); 
    }
  };

  const markDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
          todo.updatedAt = new Date().toLocaleString();
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
          todo.updatedAt = new Date().toLocaleString();
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
      <input value={filterTodos} placeholder="Filter Todos..." 
      onChange={(e) => {setFilterTodos(e.target.value)}}
      type="text"
      ></input>
      {visibleTodos.map((todo) => (
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
