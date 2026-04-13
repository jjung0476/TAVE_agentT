import { BoardProvider } from '../contexts/BoardContext';
import { ModalProvider } from '../contexts/ModalContext';
import BoardHeader from './BoardHeader';
import BoardColumns from './BoardColumns';
import CardModal from './CardModal';

export default function Board() {
  return (
    <BoardProvider>
      <ModalProvider>
        <div style={{ width: '100%', margin: 0, padding: '20px 0' }}>
          <BoardHeader />
          <BoardColumns />
          <CardModal />
        </div>
      </ModalProvider>
    </BoardProvider>
  );
}