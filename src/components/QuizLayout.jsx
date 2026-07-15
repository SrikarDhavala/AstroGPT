import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import QuizEngine from './QuizEngine'; // Ensure you saved the previous component as QuizEngine.jsx
import { uploadPDF, generateQuiz } from '../api';
import SettingsModal from './SettingsModal';

export default function QuizLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [quizDifficulty, setQuizDifficulty] = useState('intermediate');
    const [quizLength, setQuizLength] = useState(8);
    const [quizFormat, setQuizFormat] = useState('mixed');

    // Form States
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState(null);

    const handleStartQuiz = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (file) {
                await uploadPDF(file);
            }
            // Call the API (will use our dummy fallback for now)
            const quizData = await generateQuiz(
                topic || "General Astrophysics",
                quizDifficulty,
                quizLength,
                quizFormat
            );
            setQuestions(quizData);
        } catch (error) {
            console.error("Failed to start quiz", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetQuiz = () => {
        setQuestions(null);
        setTopic('');
        setFile(null);
    };

    return (
        <div className="relative min-h-screen w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-slate-100 overflow-hidden">

            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(false)}
                onOpenSettings={() => setIsSettingsOpen(true)}
            />

            <div className="w-full max-w-5xl mx-auto h-[90vh] sm:h-[85vh] flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden relative z-10">

                <Header toggleSidebar={() => setIsSidebarOpen(true)} />

                <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">

                    {isLoading ? (
                        <div className="flex flex-col items-center animate-pulse">
                            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-emerald-400 font-medium">Generating intelligent flashcards...</p>
                        </div>
                    ) : questions ? (
                        <QuizEngine questions={questions} onComplete={(finalScore) => {
                            alert(`Quiz Complete! You scored ${finalScore} out of ${questions.length}`);
                            resetQuiz();
                        }} />
                    ) : (
                        // The Setup Form
                        <div className="w-full max-w-md bg-slate-900/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Generate a Quiz</h2>
                            <form onSubmit={handleStartQuiz} className="space-y-6">

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Upload a Research Paper (Optional)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-1 border-t border-white/10"></div>
                                    <span className="px-3 text-slate-500 text-sm">AND / OR</span>
                                    <div className="flex-1 border-t border-white/10"></div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Specific Topic</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Black Hole Thermodynamics"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                                >
                                    Start Generation
                                </button>
                            </form>
                        </div>
                    )}

                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} quizDifficulty={quizDifficulty} setQuizDifficulty={setQuizDifficulty} quizLength={quizLength} setQuizLength={setQuizLength} quizFormat={quizFormat} setQuizFormat={setQuizFormat} />
        </div>
    );
}