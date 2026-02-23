import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would validate credentials here.
        // For now, we redirect to the chat interface.
        navigate('/chat');
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex items-center justify-center p-4">

            {/* Glass Card Container */}
            <div className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.15)] p-8 relative overflow-hidden">

                {/* Decorative Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none"></div>

                {/* Header / Logo */}
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4 shadow-lg shadow-indigo-500/10">
                        <Rocket className="text-indigo-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Join the Mission'}
                    </h1>
                    <p className="text-indigo-200/60 text-sm">
                        {isLogin
                            ? 'Enter your credentials to access the research terminal.'
                            : 'Create your clearance level to begin analyzing data.'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-indigo-200/80 ml-1">Full Name</label>
                            <div className="relative group">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Dr. Eleanor Arroway"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-indigo-200/20 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-900/10 transition-all"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-indigo-200/80 ml-1">Email Coordinates</label>
                        <div className="relative group">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                placeholder="name@astrolab.edu"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-indigo-200/20 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-900/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-indigo-200/80 ml-1">Access Code</label>
                        <div className="relative group">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-indigo-200/20 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-900/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isLogin ? 'Initiate Sequence' : 'Register Access'}
                        <ArrowRight size={18} />
                    </button>
                </form>

                {/* Footer / Toggle */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-indigo-200/60">
                        {isLogin ? "Don't have clearance?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
                        >
                            {isLogin ? 'Request Access' : 'Log In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}