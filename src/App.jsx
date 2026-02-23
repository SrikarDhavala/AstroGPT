import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import ChatLayout from './components/ChatLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Sign In / Sign Up page */}
        <Route path="/" element={<Auth />} />

        {/* Route for the Main Chat Interface */}
        <Route path="/chat" element={<ChatLayout />} />

        {/* Redirect any unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}