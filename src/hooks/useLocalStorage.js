import { useState, useEffect, useCallback } from 'react'

/**
localStorage와 동기화되는 state를 제공하는 커스텀 훅
 * @param {string} key - localStorage 키
 * @param {any} initialValue - 초기값
 */
function useLocalStorage(key, initialValue) {
  // agent-skills: rerender-lazy-state-init
  // localStorage 읽기는 비용이 크므로 lazy 초기화 사용
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // agent-skills: rerender-functional-setstate
  // 함수형 업데이트를 지원하는 setValue 래퍼
  const setValue = useCallback((value) => {
    try {
      setStoredValue(prev => {
        // value가 함수면 이전 값을 넘겨 실행
        const valueToStore = value instanceof Function ? value(prev) : value
        
        // localStorage에 저장
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        
        return valueToStore
      })
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue]
}

export default useLocalStorage