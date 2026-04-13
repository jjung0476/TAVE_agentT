import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  const value = {
    isOpen,
    selectedCard,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}