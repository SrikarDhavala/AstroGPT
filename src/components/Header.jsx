import { Rocket, Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
    return (
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-indigo-300 md:hidden"
                >
                    <Menu size={20} />
                </button>
                <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30 hidden md:block">
                    <Rocket className="text-indigo-400" size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                        ASTRO-GPT
                    </h1>
                    <p className="text-xs text-indigo-200/60 uppercase tracking-widest">Research Assistant</p>
                </div>
            </div>

            {/* Desktop Hamburger (Optional, if you want it visible on large screens too) */}
            <button
                onClick={toggleSidebar}
                className="hidden md:block p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-indigo-300 cursor-pointer"
            >
                <Menu size={20} />
            </button>
        </div>
    );
}