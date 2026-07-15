import { useNavigate } from 'react-router-dom';
import { MessageSquare, Target } from 'lucide-react';

export default function ModeSelection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black p-4">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center text-white mb-10 animate-fade-in-up">
                    Select Your Workspace
                </h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Chat Mode Card */}
                    <button
                        onClick={() => navigate('/chat')}
                        className="group relative flex flex-col items-center justify-center p-12 h-80 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <MessageSquare size={64} className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold text-white mb-2">Research Chat</h2>
                        <p className="text-slate-400 text-center">Interactive Q&A and document analysis.</p>
                    </button>

                    {/* Quiz Mode Card */}
                    <button
                        onClick={() => navigate('/quiz')}
                        className="group relative flex flex-col items-center justify-center p-12 h-80 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm hover:bg-slate-800/60 hover:border-emerald-500/50 transition-all duration-300"
                    >
                        <Target size={64} className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold text-white mb-2">Knowledge Quiz</h2>
                        <p className="text-slate-400 text-center">Test your understanding with smart flashcards.</p>
                    </button>
                </div>
            </div>
        </div>
    );
}