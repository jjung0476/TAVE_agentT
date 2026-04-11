import { useParams, useNavigate } from 'react-router-dom'

const PRIORITY_LABEL = { high: '높음', medium: '보통', low: '낮음' }

function DetailPage({ todos, onToggle, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()

  // 유효하지 않은 경우 즉시 반환
  const todo = todos.find(t => t.id === Number(id))
  if (!todo) {
    return (
      <div className="detail-container">
        <p className="detail-notfound">해당 할 일을 찾을 수 없습니다.</p>
        <button className="nav-btn" onClick={() => navigate('/')}>돌아가기</button>
      </div>
    )
  }

  // 삭제 후 이동 로직을 useEffect가 아닌 이벤트 핸들러에서 직접 처리
  const handleDelete = () => {
    onDelete(todo.id)
    navigate('/')
  }

  return (
    <div id="center">
      <h1>할 일 상세</h1>
 
      <div style={{ textAlign: 'left', width: '400px' }}>
        <p style={{ marginBottom: '8px' }}>
          <strong>내용:</strong>{' '}
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#888' : '#000' }}>
            {todo.text}
          </span>
        </p>
        <p style={{ marginBottom: '8px' }}><strong>카테고리:</strong> {todo.category}</p>
        <p style={{ marginBottom: '8px' }}><strong>우선순위:</strong> {PRIORITY_LABEL[todo.priority]}</p>
        <p style={{ marginBottom: '20px' }}><strong>상태:</strong> {todo.done ? '완료' : '미완료'}</p>
 
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onToggle(todo.id)}>
            {todo.done ? '완료 취소' : '완료 처리'}
          </button>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={() => navigate('/')}>돌아가기</button>
        </div>
      </div>
    </div>
  )
}

export default DetailPage