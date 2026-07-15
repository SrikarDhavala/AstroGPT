import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import ChatLayout from './components/ChatLayout';
import ModeSelection from './components/ModeSelection';
import QuizLayout from './components/QuizLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Sign In / Sign Up page */}
        <Route path="/" element={<Auth />} />

        <Route path="/select-mode" element={<ModeSelection />} />

        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/quiz" element={<QuizLayout />} />

        {/* Redirect any unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}