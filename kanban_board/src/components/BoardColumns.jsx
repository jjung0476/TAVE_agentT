import { useBoardContext } from '../contexts/BoardContext';
import Column from './Column';
import Card from './Card';

export default function BoardColumns() {
  const { getFilteredCards } = useBoardContext();

  return (
    <div style={{ 
      display: 'flex', 
      gap: '30px',           
      width: '100%',         
      padding: '0 40px',
      boxSizing: 'border-box',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}>
      <Column status="todo" title="1 TO DO">
        {getFilteredCards('todo').map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Column>

      <Column status="in_progress" title="2 IN PROGRESS">
        {getFilteredCards('in_progress').map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Column>

      <Column status="done" title="3 DONE">
        {getFilteredCards('done').map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Column>
    </div>
  );
}