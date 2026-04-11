import { useState } from 'react'

const CATEGORIES = ['학습', '건강', '생활', '업무', '기타']
const PRIORITIES = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

function TaskItem({ todo, onToggle, onDelete, onUpdate, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editCategory, setEditCategory] = useState(todo.category)
  const [editPriority, setEditPriority] = useState(todo.priority)

  const isOverLimit = editText.length > 20

  // 저장 로직을 useEffect가 아닌 이벤트 핸들러에서 직접 처리
  const handleSave = () => {
    if (!editText.trim()) return
    if (isOverLimit) return
    onUpdate(todo.id, editText.trim(), editCategory, editPriority)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditCategory(todo.category)
    setEditPriority(todo.priority)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          style={{ marginRight: '5px', padding: '3px' }}
        />
        <select value={editCategory} onChange={e => setEditCategory(e.target.value)} style={{ marginRight: '5px' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={editPriority} onChange={e => setEditPriority(e.target.value)} style={{ marginRight: '5px' }}>
          {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <button onClick={handleSave} disabled={isOverLimit || !editText.trim()} style={{ marginRight: '5px' }}>저장</button>
        <button onClick={handleCancel}>취소</button>
        {isOverLimit ? <span style={{ color: 'red', fontSize: '12px', marginLeft: '8px' }}>20자 초과</span> : null}
      </li>
    )
  }
 
  return (
    <li style={{ marginBottom: '10px' }}>
      <div style={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ textAlign: 'left', flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => onNavigate(todo.id)}>
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#888' : '#000' }}>
            {todo.text}
          </span>
          <small style={{ marginLeft: '6px', color: '#999', fontSize: '12px', textDecoration: 'none' }}>
            {todo.category}
          </small>
        </span>
        <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
          <button onClick={() => onToggle(todo.id)} style={{ padding: '3px 7px' }}>
            {todo.done ? '취소' : '완료'}
          </button>
          <button onClick={() => setIsEditing(true)} style={{ padding: '3px 7px' }}>수정</button>
          <button onClick={() => onDelete(todo.id)} style={{ padding: '3px 7px' }}>삭제</button>
        </div>
      </div>
    </li>
  )
}

function TaskList({ todos, onToggle, onDelete, onUpdate, onNavigate }) {
  // todos.length가 0일 때 && 쓰면 '0'이 렌더링되는 함정 → 삼항 연산자 사용
  return (
    <ul style={{ width: '400px', margin: '0 auto', paddingLeft: '25px', textAlign: 'left' }}>
      {todos.length === 0 ? (
        <li style={{ color: '#888', listStyle: 'none' }}>할 일이 없습니다!</li>
      ) : (
        todos.map(todo => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onNavigate={onNavigate}
          />
        ))
      )}
    </ul>
  )
}

export default TaskList