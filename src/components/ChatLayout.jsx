import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal'
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import { uploadPDF, chatWithPDF } from '../api'; // Import our new API functions

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading spinners
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Greetings. Upload an astrophysics research paper (PDF) to begin our analysis.' }
  ]);

  const handleSendMessage = async (text, file) => {
    // 1. Handle File Upload (Priority)
    if (file) {
      setMessages(prev => [...prev, { role: 'user', text: `Uploaded: ${file.name}`, attachedFile: file.name }]);
      setMessages(prev => [...prev, { role: 'bot', text: 'Analyzing research paper... (This may take a moment)' }]);

      try {
        setIsLoading(true);
        await uploadPDF(file);
        setMessages(prev => [...prev, { role: 'bot', text: 'Analysis complete. I have memorized the document. What would you like to know?' }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'bot', text: 'Error: Failed to process the PDF. Please check the backend console.' }]);
      } finally {
        setIsLoading(false);
      }
      return; // Stop here if it was just a file upload
    }

    // 2. Handle Text Question
    if (text) {
      setMessages(prev => [...prev, { role: 'user', text }]);
      setIsLoading(true);

      try {
        const answer = await chatWithPDF(text);
        setMessages(prev => [...prev, { role: 'bot', text: answer }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'bot', text: 'Error: Unable to reach the control center (Backend).' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-slate-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} onOpenSettings={() => setIsSettingsOpen(true)} />
      <div className="w-full max-w-5xl mx-auto h-[90vh] sm:h-[85vh] flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
        <Header toggleSidebar={() => setIsSidebarOpen(true)} />

        {/* Pass isLoading to ChatArea if you want to show a spinner later */}
        <ChatArea messages={messages} isLoading={isLoading} />

        {/* Disable input while loading */}
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}