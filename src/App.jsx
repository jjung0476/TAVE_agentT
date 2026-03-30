import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import SettingsPage from './pages/SettingsPage.jsx'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 공부하기', done: false, category: '학습', priority: 'high' },
    { id: 2, text: '운동 30분', done: true, category: '건강', priority: 'medium' },
    { id: 3, text: '장보기', done: false, category: '생활', priority: 'low' },
  ])

  // 추가 함수
  // prev -> 함수형 업데이트로 stale closure 방지
  const addTodo = (text, category, priority) => {
    const newTodo = { id: Date.now(), text, done: false, category, priority }
    setTodos(prev => [...prev, newTodo])
  }

  // 완료 함수
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  // 삭제 함수
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  // 갱신 함수
  const updateTodo = (id, newText, newCategory, newPriority) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text: newText, category: newCategory, priority: newPriority }
          : todo
      )
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              todos={todos}
              onAdd={addTodo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<DetailPage todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App