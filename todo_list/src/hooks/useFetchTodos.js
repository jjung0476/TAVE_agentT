import { useQuery } from '@tanstack/react-query'

/**
 * agent-skills: async-defer-await
 * Promise를 먼저 시작하고 필요할 때 await
 */
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  
  const data = await response.json()
  
  return data.slice(0, 10).map(todo => ({
    id: todo.id,
    text: todo.title,
    done: todo.completed,
    category: '업무', // API에 없는 필드는 기본값
    priority: 'medium',
  }))
}

/**
 * TanStack Query로 todos를 가져오는 훅
 */
function useFetchTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: 2, // 실패 시 2번 재시도
  })
}

export default useFetchTodos