import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'


export const TodoWrapper = ({task}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    // setTodos([
    //   ...todos,
    //   { id: uuidv4(), task: todo, completed: false, isEditing: false, hide: false },
    // ]);
    const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

    //méfait accompli tu peux le barrer 
  const toggleComplete = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  let value = 0;
  const filterTodo = () => {
   // Incrémente value à chaque appel
  value++;
    // val = (val === 3) ? val = 0 : val;
    console.log('val', value);
    switch (value) {
      case 0:
        setTodos(
          todos.map((todo) =>
            todo.completed ? { ...todo, hide: !todo.hide } : todo
          )
        );
        break;
      case 1:
        setTodos(
          todos.map((todo) =>
            todo.completed ? { ...todo, hide: !todo.hide } : todo
          )
        );
        break;
      case 2:
        setTodos(
          todos.map((todo) =>
            !todo.completed ? { ...todo, hide: !todo.hide } : todo
          )
        );
        break;
      case 3:
        setTodos(
          todos.map((todo) =>
            !todo.completed ? { ...todo, hide: !todo.hide } : todo
          )
        );
        break;
      default:
        break;
    }
    
  };
    
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <div>
        <FontAwesomeIcon className="filter-icon" icon={faFilter} onClick={() => filterTodo()}/>
      </div>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};