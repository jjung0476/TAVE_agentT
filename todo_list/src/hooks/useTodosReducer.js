import { useReducer } from 'react'

// 액션 타입 상수
const ACTIONS = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  SET_ALL: 'SET_ALL', // API 데이터 초기화용
}

// Reducer 함수 - 모든 CRUD 로직 통합
function todosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload]

    case ACTIONS.TOGGLE:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      )

    case ACTIONS.DELETE:
      return state.filter(todo => todo.id !== action.payload)

    case ACTIONS.UPDATE:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      )

    case ACTIONS.SET_ALL:
      return action.payload

    default:
      return state
  }
}

/**
 * todos 상태를 관리하는 reducer 훅
 */
function useTodosReducer(initialTodos = []) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  // agent-skills: rerender-functional-setstate
  // 액션 크리에이터들 - useCallback 불필요 (dispatch는 안정적)
  const actions = {
    addTodo: (text, category, priority) => {
      dispatch({
        type: ACTIONS.ADD,
        payload: {
          id: Date.now(),
          text,
          done: false,
          category,
          priority,
        },
      })
    },

    toggleTodo: (id) => {
      dispatch({ type: ACTIONS.TOGGLE, payload: id })
    },

    deleteTodo: (id) => {
      dispatch({ type: ACTIONS.DELETE, payload: id })
    },

    updateTodo: (id, text, category, priority) => {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: {
          id,
          updates: { text, category, priority },
        },
      })
    },

    setAllTodos: (todos) => {
      dispatch({ type: ACTIONS.SET_ALL, payload: todos })
    },
  }

  return [todos, actions]
}

export default useTodosReducer