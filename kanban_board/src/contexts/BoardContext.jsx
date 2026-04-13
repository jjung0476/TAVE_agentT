import { createContext, useContext, useState } from 'react';

const BoardContext = createContext(null);

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider');
  }
  return context;
}

const initialCards = [
  { id: '1', title: '요리', status: 'todo', priority: 'high', category: 'work' },
  { id: '2', title: '과제', status: 'in_progress', priority: 'medium', category: 'personal' },
  { id: '3', title: '청소', status: 'done', priority: 'low', category: 'work' }
];

const initialUser = {
  name: 'Veci Martins',
  email: 'veci.martins@example.com',
  avatar: '/api/placeholder/80/80'
};

export function BoardProvider({ children }) {
  const [cards, setCards] = useState(initialCards);
  const [filters, setFilters] = useState({
    searchText: '',
    priority: 'all',
    category: 'all',
    statusFilter: 'all',
    sortBy: 'recent',
    viewMode: 'all'
  });
  const [user] = useState(initialUser);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const moveCard = (cardId, newStatus) => {
    setCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, status: newStatus } : card
      )
    );
  };

  const deleteCard = (cardId) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
  };

  const updateCard = (cardId, updates) => {
    setCards(prev =>
      prev.map(card => 
        card.id === cardId ? { ...card, ...updates } : card
      )
    );
  };

  const getFilteredCards = (status) => {
    return cards.filter(card => {
      if (card.status !== status) return false;
      
      if (filters.searchText && !card.title.includes(filters.searchText)) {
        return false;
      }
      
      if (filters.priority !== 'all' && card.priority !== filters.priority) {
        return false;
      }
      
      if (filters.category !== 'all' && card.category !== filters.category) {
        return false;
      }
      
      if (filters.statusFilter !== 'all' && card.status !== filters.statusFilter) {
        return false;
      }
      
      if (filters.viewMode === 'complete' && card.status !== 'done') {
        return false;
      }
      
      if (filters.viewMode === 'incomplete' && card.status === 'done') {
        return false;
      }
      
      return true;
    });
  };

  const stats = {
    total: cards.length,
    completed: cards.filter(c => c.status === 'done').length
  };

  const value = {
    cards,
    filters,
    user,
    stats,
    updateFilter,
    moveCard,
    deleteCard,
    updateCard,
    getFilteredCards
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
}