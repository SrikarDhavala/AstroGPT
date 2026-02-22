import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Greetings. Upload an astrophysics research paper (PDF) to begin our analysis.' }
  ]);

  const handleSendMessage = (text, file) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text, attachedFile: file?.name }]);

    // Simulate bot response for now
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: 'Processing orbital mechanics... (Backend API pending)' }]);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-slate-100 overflow-hidden">

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      {/* Main Chat Container - Added w-full and mx-auto for strict centering */}
      <div className="w-full max-w-5xl mx-auto h-[90vh] sm:h-[85vh] flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden relative z-10">

        <Header toggleSidebar={() => setIsSidebarOpen(true)} />
        <ChatArea messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />

      </div>
    </div>
  );
}