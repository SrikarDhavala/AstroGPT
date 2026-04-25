import { useState } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('chat');

    // Example configuration states you can later pass to your backend
    const [responseLength, setResponseLength] = useState('detailed');
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
                        User Settings
                    </div>
                    <div className="flex-1 px-4 space-y-1">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'chat'
                                    ? 'bg-indigo-600/80 text-white font-medium'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                                }`}
                        >
                            Chat Behavior
                        </button>
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${activeTab === 'appearance'
                                    ? 'bg-indigo-600/80 text-white font-medium'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                                }`}
                        >
                            Appearance
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Settings Content */}
                <div className="w-2/3 flex flex-col bg-slate-900/40 relative">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-6 text-slate-400 hover:text-white text-2xl transition-colors"
                    >
                        &times;
                    </button>

                    <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent">

                        {/* Chat Behavior Settings */}
                        {activeTab === 'chat' && (
                            <div className="space-y-8 animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-slate-100 mb-6">Chat Behavior</h2>

                                {/* Setting 1: Detail Level */}
                                <div className="space-y-3 border-b border-white/5 pb-6">
                                    <label className="block text-sm font-medium text-slate-200">Response Detail Level</label>
                                    <p className="text-xs text-slate-400">Adjust how deeply the AI explains concepts.</p>
                                    <select
                                        value={responseLength}
                                        onChange={(e) => setResponseLength(e.target.value)}
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

                                {/* Setting 3: Source Toggle */}
                                <div className="flex items-center justify-between pb-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-200">Include Inline Citations</label>
                                        <p className="text-xs text-slate-400 mt-1">Automatically append source document page numbers.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={showSources} onChange={() => setShowSources(!showSources)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                    </label>
                                </div>

                            </div>
                        )}

                        {/* Appearance Settings */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-8 animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-slate-100 mb-6">Appearance</h2>
                                <div className="text-sm text-slate-400 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
                                    💡 You can add theme toggles (Dark/Light mode) or font size adjustments here later.
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}