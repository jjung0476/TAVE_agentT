import { useBoardContext } from '../contexts/BoardContext';
import { useModalContext } from '../contexts/ModalContext';

export default function Card({ card }) {
  const { moveCard, deleteCard } = useBoardContext();
  const { openModal } = useModalContext();

  return (
    <div style={{
      padding: '1.5rem 1rem',
      borderRadius: '4px',
      background: '#e2ffd6', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ 
        fontSize: '1rem', 
        fontWeight: '500', 
        lineHeight: '1.4',
        color: '#333'
      }}>
        {card.title}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '0.3rem',
        marginTop: '1rem' 
      }}>
        <button onClick={() => moveCard(card.id, 'done')} style={miniButtonStyle}>완료</button>
        <button onClick={() => openModal(card)} style={miniButtonStyle}>수정</button>
        <button onClick={() => deleteCard(card.id)} style={miniButtonStyle}>삭제</button>
      </div>
    </div>
  );
}

const miniButtonStyle = {
  padding: '0.2rem 0.5rem',
  border: '1px solid #ccc',
  borderRadius: '3px',
  background: 'white',
  cursor: 'pointer',
  fontSize: '0.75rem',
  opacity: 0.7
};