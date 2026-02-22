import { FileText } from 'lucide-react';

export default function ChatArea({ messages }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${msg.role === 'user'
                            ? 'bg-indigo-600/40 border border-indigo-500/30 rounded-tr-sm'
                            : 'bg-white/5 border border-white/10 rounded-tl-sm'
                        }`}>
                        {msg.attachedFile && (
                            <div className="flex items-center gap-2 mb-3 p-2 bg-black/30 rounded-lg text-sm text-indigo-200 w-max max-w-full">
                                <FileText size={16} className="shrink-0" />
                                <span className="truncate">{msg.attachedFile}</span>
                            </div>
                        )}
                        <p className="leading-relaxed text-sm sm:text-base">{msg.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}