import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import TaskList from '../components/TaskList'
import UserProfile from '../components/UserProfile'
import FilterTabs from '../components/FilterTabs'

const CATEGORIES = ['전체', '학습', '건강', '생활', '업무', '기타']
const SORT_OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'priority', label: '우선순위순' },
  { value: 'alpha', label: '가나다순' },
]
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

function MainPage({ todos, onAdd, onToggle, onDelete, onUpdate }) {
  const navigate = useNavigate()

  const [filterTab, setFilterTab] = useState('전체')       
  const [categoryFilter, setCategoryFilter] = useState('전체')
  const [sortBy, setSortBy] = useState('default')

  // .sort() 대신 .toSorted() 사용
  const filteredTodos = useMemo(() => {
    let result = todos

    // 탭 필터
    if (filterTab === '완료') result = result.filter(t => t.done)
    else if (filterTab === '미완료') result = result.filter(t => !t.done)

    // 카테고리 필터
    if (categoryFilter !== '전체') result = result.filter(t => t.category === categoryFilter)

    // 정렬 — 원본 불변성 유지
    if (sortBy === 'priority') {
      result = result.toSorted((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    } else if (sortBy === 'alpha') {
      result = result.toSorted((a, b) => a.text.localeCompare(b.text))
    }

    return result
  }, [todos, filterTab, categoryFilter, sortBy])

  return (
    <div id="center">
      <h1>My Todo List</h1>
 
      <UserProfile />
 
      <hr style={{ width: '100%' }} />
 
      <TextInput onAdd={onAdd} />
 
      <div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ marginRight: '8px' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">기본순</option>
          <option value="priority">우선순위순</option>
          <option value="alpha">가나다순</option>
        </select>
      </div>
 
      <div>
        {['전체', '미완료', '완료'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            style={{ marginRight: '5px', fontWeight: filterTab === tab ? 'bold' : 'normal' }}
          >
            {tab}
          </button>
        ))}
      </div>
 
      <TaskList
        todos={filteredTodos}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onNavigate={id => navigate(`/todo/${id}`)}
      />
    </div>
  )
}

export default MainPage