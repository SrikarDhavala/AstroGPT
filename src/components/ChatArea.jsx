import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

// Add isLoading to the props here
export default function ChatArea({ messages, isLoading }) {
  // Auto-scroll to bottom ref
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
        >
          <div
            className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/10 ${
              msg.role === 'user'
                ? 'bg-indigo-600/80 text-white rounded-br-none'
                : 'bg-slate-800/60 text-slate-100 rounded-bl-none'
            }`}
          >
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  strong: ({node, ...props}) => <span className="font-bold text-indigo-300" {...props} />,
                  a: ({node, ...props}) => <a className="text-cyan-400 hover:underline" target="_blank" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
                  code: ({node, inline, className, children, ...props}) => {
                    return inline ? (
                      <code className="bg-slate-700/50 px-1 py-0.5 rounded text-indigo-200 text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="bg-slate-950/50 p-3 rounded-lg border border-white/10 my-2 overflow-x-auto">
                         <code className="text-sm font-mono text-indigo-100" {...props}>
                          {children}
                        </code>
                      </div>
                    )
                  }
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
            {msg.attachedFile && (
              <div className="mt-2 text-xs text-indigo-200 flex items-center gap-1 opacity-75">
                <span>📎</span> {msg.attachedFile}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* --- THE THINKING ANIMATION --- */}
      {isLoading && (
        <div className="flex justify-start animate-fade-in-up">
          <div className="bg-slate-800/60 p-4 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      )}
      
      {/* Invisible element to auto-scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
}