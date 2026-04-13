import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Board from './components/Board';
import Settings from './components/Settings';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}