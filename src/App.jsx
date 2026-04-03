import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import SettingsPage from './pages/SettingsPage.jsx'
import useTodosReducer from './hooks/useTodosReducer'
import useLocalStorage from './hooks/useLocalStorage'
import useFetchTodos from './hooks/useFetchTodos'
import './App.css'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient()

function AppContent() {
  // useReducer로 전환
  const [todos, actions] = useTodosReducer([])
  
  // localStorage와 동기화
  const [savedTodos, setSavedTodos] = useLocalStorage('todos', [])
  
  // TanStack Query로 API 데이터 가져오기
  const { data: apiTodos, isLoading, isError, error, refetch } = useFetchTodos()

  // 초기 로드: localStorage 우선, 없으면 API 데이터
  useEffect(() => {
    if (savedTodos.length > 0) {
      // localStorage에 저장된 데이터가 있으면 사용
      actions.setAllTodos(savedTodos)
    } else if (apiTodos) {
      // 없으면 API 데이터로 초기화
      actions.setAllTodos(apiTodos)
    }
  }, []) // 마운트 시 1회만 실행

  // todos 변경 시 localStorage에 자동 저장
  useEffect(() => {
    if (todos.length > 0) {
      setSavedTodos(todos)
    }
  }, [todos, setSavedTodos])

  // 로딩 상태
  if (isLoading) {
    return (
      <div id="center">
        <h1>My Todo List</h1>
          <p style={{ marginTop: '16px', color: '#666' }}>할 일 목록을 불러오는 중...</p>
      </div>
    )
  }

  // 에러 상태
  if (isError && savedTodos.length === 0) {
    return (
      <div id="center">
        <h1>My Todo List</h1>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'red', marginBottom: '16px' }}>
            ❌ 데이터를 불러오는데 실패했습니다.
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            {error?.message || '알 수 없는 오류가 발생했습니다.'}
          </p>
          <button onClick={() => refetch()}>다시 시도</button>
        </div>
      </div>
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
              onAdd={actions.addTodo}
              onToggle={actions.toggleTodo}
              onDelete={actions.deleteTodo}
              onUpdate={actions.updateTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <DetailPage
              todos={todos}
              onToggle={actions.toggleTodo}
              onDelete={actions.deleteTodo}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App