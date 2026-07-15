import { useState } from 'react';

export default function SettingsModal({ isOpen, onClose, responseDetail, setResponseDetail, quizDifficulty = "intermediate", setQuizDifficulty, quizLength = 8, setQuizLength, quizFormat = "mixed", setQuizFormat }) {
    const [activeTab, setActiveTab] = useState('chat');

    // Example configuration states you can later pass to your backend
    const [creativity, setCreativity] = useState(0.3); // Corresponds to LLM Temperature
    const [showSources, setShowSources] = useState(true);

    if (!isOpen) return null;

    return (
        // Backdrop blur overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">

            <div className="flex w-full max-w-4xl h-[70vh] bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

                {/* LEFT COLUMN: Sidebar Navigation */}
                <div className="w-1/3 bg-slate-950/50 border-r border-white/10 flex flex-col">
                    <div className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Workspace Settings
                    </div>
                    <div className="flex-1 px-4 space-y-1">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'chat' ? 'bg-indigo-600/80 text-white' : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            Chat Behavior
                        </button>
                        <button
                            onClick={() => setActiveTab('quiz')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'quiz' ? 'bg-emerald-600/80 text-white' : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            Quiz Configuration
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Settings Content */}
                <div className="w-2/3 flex flex-col bg-slate-900/40 relative">
                    <button onClick={onClose} className="absolute top-4 right-6 text-slate-400 hover:text-white text-2xl">
                        &times;
                    </button>

                    <div className="flex-1 p-8 overflow-y-auto scrollbar-thin">

                        {/* CHAT TAB */}
                        {activeTab === 'chat' && (
                            <div className="space-y-8 animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-slate-100 mb-6">Chat Behavior</h2>

                                {/* Setting 1: Detail Level */}
                                <div className="space-y-3 border-b border-white/5 pb-6">
                                    <label className="block text-sm font-medium text-slate-200">Response Detail Level</label>
                                    <p className="text-xs text-slate-400">Adjust how deeply the AI explains concepts.</p>
                                    <select
                                        value={responseDetail}
                                        onChange={(e) => setResponseDetail(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/10 text-slate-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none"
                                    >
                                        <option value="simple">Simple (ELI5)</option>
                                        <option value="balanced">Balanced</option>
                                        <option value="detailed">Detailed & Academic</option>
                                    </select>
                                </div>

                                {/* Setting 2: Creativity Slider */}
                                <div className="space-y-3 border-b border-white/5 pb-6">
                                    <div className="flex justify-between">
                                        <label className="block text-sm font-medium text-slate-200">Creativity / Precision</label>
                                        <span className="text-xs text-indigo-400">{creativity}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Lower values give strict factual answers. Higher values allow more creative text.</p>
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.1"
                                        value={creativity}
                                        onChange={(e) => setCreativity(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* QUIZ TAB */}
                        {activeTab === 'quiz' && (
                            <div className="space-y-8 animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-slate-100 mb-6">Quiz Configuration</h2>

                                {/* Setting 1: Difficulty */}
                                <div className="space-y-3 border-b border-white/5 pb-6">
                                    <label className="block text-sm font-medium text-slate-200">Difficulty Level</label>
                                    <select
                                        value={quizDifficulty}
                                        onChange={(e) => setQuizDifficulty && setQuizDifficulty(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/10 text-slate-200 text-sm rounded-lg p-2.5 outline-none focus:border-emerald-500"
                                    >
                                        <option value="beginner">Beginner (Basic Facts)</option>
                                        <option value="intermediate">Intermediate (Core Concepts)</option>
                                        <option value="expert">Expert (Deep Application)</option>
                                    </select>
                                </div>

                                {/* Setting 2: Length */}
                                <div className="space-y-3 border-b border-white/5 pb-6">
                                    <label className="block text-sm font-medium text-slate-200">Number of Questions</label>
                                    <select
                                        value={quizLength}
                                        onChange={(e) => setQuizLength && setQuizLength(Number(e.target.value))}
                                        className="w-full bg-slate-950/50 border border-white/10 text-slate-200 text-sm rounded-lg p-2.5 outline-none focus:border-emerald-500"
                                    >
                                        <option value={5}>5 Questions (Quick Review)</option>
                                        <option value={8}>8 Questions (Standard)</option>
                                        <option value={12}>12 Questions (Deep Dive)</option>
                                    </select>
                                </div>

                                {/* Setting 3: Format */}
                                <div className="space-y-3 pb-6">
                                    <label className="block text-sm font-medium text-slate-200">Question Format</label>
                                    <select
                                        value={quizFormat}
                                        onChange={(e) => setQuizFormat && setQuizFormat(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/10 text-slate-200 text-sm rounded-lg p-2.5 outline-none focus:border-emerald-500"
                                    >
                                        <option value="mixed">Mixed (MCQ & True/False)</option>
                                        <option value="mcq">Multiple Choice Only</option>
                                        <option value="tf">True/False Only</option>
                                    </select>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}