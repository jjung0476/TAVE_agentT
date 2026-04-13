import { useState, useEffect } from 'react'; 
import { useModalContext } from '../contexts/ModalContext';
import { useBoardContext } from '../contexts/BoardContext';

export default function CardModal() {
  const { isOpen, closeModal, selectedCard } = useModalContext();
  const { updateCard } = useBoardContext();
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    if (selectedCard) {
      setEditedTitle(selectedCard.title);
      setEditedStatus(selectedCard.status);
    }
  }, [selectedCard]);

  if (!isOpen || !selectedCard) return null;

  const handleSave = () => {
    updateCard(selectedCard.id, { 
      title: editedTitle, 
      status: editedStatus 
    });
    closeModal();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: '1.5rem' }}>카드 상세</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>제목</label>
          <input
            type="text"
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>상태</label>
          <select
            value={editedStatus} 
            onChange={(e) => setEditedStatus(e.target.value)} 
            style={inputStyle}
          >
            <option value="todo">할 일</option>
            <option value="in_progress">진행 중</option>
            <option value="done">완료</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} style={saveButtonStyle}>저장</button>
          <button onClick={closeModal} style={closeButtonStyle}>닫기</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalStyle = { background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' };
const saveButtonStyle = { padding: '0.5rem 1.5rem', borderRadius: '4px', background: '#007bff', color: 'white', cursor: 'pointer', border: 'none' };
const closeButtonStyle = { padding: '0.5rem 1.5rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white', cursor: 'pointer' };