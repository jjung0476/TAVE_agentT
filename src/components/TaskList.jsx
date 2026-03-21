function TaskList({ todos, onToggle, onDelete }) {
  return (
    <ul style={{width: '400px', margin: '20px auto', paddingLeft: '25px', textAlign: 'left'}}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none', marginBottom: '10px', color: todo.done ? '#888' : '#000'}}>
            <div style={{ 
                display: 'inline-flex',    
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%' 
            }}>
        
                <span style={{ textAlign: 'left', flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
                </span>

                <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
                    <button onClick={() => onToggle(todo.id)} style={{ padding: '3px 7px' }}>
                        {todo.done ? '취소' : '완료'}
                    </button>
                    <button onClick={() => onDelete(todo.id)} style={{ padding: '3px 7px' }}>
                        삭제
                    </button>
                </div>
            </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;