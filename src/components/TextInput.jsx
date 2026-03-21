import { useState } from 'react';

function TextInput({ onAdd }) {
  const [text, setText] = useState('');

  const isOverLimit = text.length > 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isOverLimit) {
      onAdd(text);
      setText(''); 
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      marginBottom: '30px' 
    }}>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="할 일을 입력하세요 (최대 20자)"
                style={{ width: '180px', marginRight: '5px', padding: '5px' }}
            />
            <span style={{ marginRight: '10px', color: isOverLimit ? 'red' : 'black' }}>
                ({text.length}/20)
            </span>
            
            <button type="submit" disabled={isOverLimit || !text.trim()}>
                추가
            </button>

            {isOverLimit && (
                <p style={{ 
                position: 'absolute', 
                bottom: '-25px', 
                color: 'red', 
                fontSize: '12px', 
                margin: 0,
                whiteSpace: 'nowrap' 
                }}>
                20자를 초과할 수 없습니다!
                </p>
            )}
        </form>
    </div>
  );
}

export default TextInput;