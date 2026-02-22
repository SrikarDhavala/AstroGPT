import { useState, useRef } from 'react';
import { Send, Paperclip, FileText, X } from 'lucide-react';

export default function MessageInput({ onSendMessage }) {
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() && !file) return;

        onSendMessage(input, file);
        setInput('');
        setFile(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="p-4 border-t border-white/10 bg-black/20">
            {file && (
                <div className="flex items-center justify-between w-max max-w-[200px] sm:max-w-xs gap-3 mb-3 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-sm">
                    <div className="flex items-center gap-2 truncate">
                        <FileText size={16} className="text-indigo-300 shrink-0" />
                        <span className="truncate text-indigo-100">{file.name}</span>
                    </div>
                    <button onClick={() => setFile(null)} className="text-indigo-300 hover:text-white transition-colors shrink-0">
                        <X size={16} />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-indigo-300 shrink-0"
                    title="Attach PDF"
                >
                    <Paperclip size={20} />
                </button>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about astrophysics..."
                    className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />

                <button
                    type="submit"
                    className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center shrink-0"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}