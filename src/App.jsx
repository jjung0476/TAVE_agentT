import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'
import UserProfile from './components/UserProfile'

function App() {
  const [todos, setTodos] = useState([]);

  // 추가 함수
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, done: false };
    setTodos([...todos, newTodo]);
  };

  // 완료 함수
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <UserProfile />
      <hr />
      <TextInput onAdd={addTodo} />
      <TaskList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App
