import { useState } from 'react'

const CATEGORIES = ['학습', '건강', '생활', '업무', '기타']
const PRIORITIES = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

function TextInput({ onAdd }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('학습')
  const [priority, setPriority] = useState('medium')

  const isOverLimit = text.length > 20

  // 제출 로직을 useEffect가 아닌 handleSubmit에서 직접 처리
  // 유효하지 않은 경우 즉시 return
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    if (isOverLimit) return
    onAdd(text.trim(), category, priority)
    setText('')
  }

return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="할 일을 입력하세요 (최대 20자)"
          style={{ width: '180px', marginRight: '5px', padding: '5px' }}
        />
        <span style={{ marginRight: '5px', color: isOverLimit ? 'red' : 'black' }}>
          ({text.length}/20)
        </span>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginRight: '5px' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)} style={{ marginRight: '5px' }}>
          {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <button type="submit" disabled={isOverLimit || !text.trim()}>추가</button>
 
        {/* 명시적 삼항 연산자 */}
        {isOverLimit ? (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 0' }}>
            20자를 초과할 수 없습니다!
          </p>
        ) : null}
      </form>
    </div>
  )
}

export default TextInput