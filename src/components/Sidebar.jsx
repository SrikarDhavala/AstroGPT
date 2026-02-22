import { X, History, Settings, Star } from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Panel */}
            <div className={`fixed top-0 right-0 h-full w-64 md:w-80 backdrop-blur-2xl bg-slate-900/80 border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <h2 className="text-lg font-semibold text-indigo-200">Options</h2>
                    <button onClick={toggleSidebar} className="text-indigo-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-slate-200 cursor-pointer">
                        <History size={18} className="text-indigo-400" />
                        Chat History
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-slate-200 cursor-pointer">
                        <Star size={18} className="text-indigo-400" />
                        Saved Papers
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-slate-200 cursor-pointer">
                        <Settings size={18} className="text-indigo-400" />
                        Settings
                    </button>
                </div>
            </div>
        </>
    );
}