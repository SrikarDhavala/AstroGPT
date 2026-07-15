import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function QuizEngine({ questions, onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    const currentQ = questions[currentIndex];

    // Refs for drop zones to calculate coordinates
    const trueZoneRef = useRef(null);
    const falseZoneRef = useRef(null);

    const handleAnswer = (userAnswer) => {
        if (userAnswer === currentQ.correctAnswer) {
            setScore(score + 1);
        }

        // Move to next question or finish
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete(score + (userAnswer === currentQ.correctAnswer ? 1 : 0));
        }
    };

    // Drag logic for True/False
    const handleDragEnd = (event, info) => {
        const dropPoint = info.point.x;
        const windowCenter = window.innerWidth / 2;

        // Simple left/right boundary check
        if (dropPoint < windowCenter - 50) {
            handleAnswer('True');
        } else if (dropPoint > windowCenter + 50) {
            handleAnswer('False');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center relative">

            {/* Progress Header */}
            <div className="absolute top-0 w-full flex justify-between px-8 py-4 text-slate-300 font-bold">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Score: {score}</span>
            </div>

            {currentQ.type === 'TF' ? (
                // --- TRUE / FALSE DRAG UI ---
                <div className="w-full flex justify-between items-center px-12 mt-12">

                    {/* True Drop Zone */}
                    <div ref={trueZoneRef} className="w-48 h-64 border-2 border-dashed border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-500/50 font-bold text-2xl">
                        TRUE
                    </div>

                    {/* Draggable Question Card */}
                    <motion.div
                        key={currentIndex}

                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }} // Snaps back if not dropped
                        dragElastic={0.8}
                        onDragEnd={handleDragEnd}

                        style={{ touchAction: "none"}}

                        whileDrag={{ scale: 1.05, rotate: 2, cursor: "grabbing" }}
                        className="w-96 min-h-[16rem] bg-slate-800 border border-white/20 shadow-2xl rounded-2xl p-8 flex items-center justify-center text-center cursor-grab active:cursor-grabbing select-none touch-none z-10"
                    >
                        <h3 className="text-xl text-white">{currentQ.text}</h3>
                        <p className="absolute bottom-4 text-xs text-slate-400">Drag left for True, right for False</p>
                    </motion.div>

                    {/* False Drop Zone */}
                    <div ref={falseZoneRef} className="w-48 h-64 border-2 border-dashed border-rose-500/50 rounded-2xl flex items-center justify-center text-rose-500/50 font-bold text-2xl">
                        FALSE
                    </div>
                </div>
            ) : (
                // --- MCQ CLICK UI ---
                <div className="w-full max-w-2xl flex flex-col items-center mt-12">
                    <div className="w-full bg-slate-800 border border-white/20 rounded-2xl p-8 text-center mb-8 shadow-xl">
                        <h3 className="text-xl text-white">{currentQ.text}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        {currentQ.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className="p-6 bg-slate-900/50 border border-white/10 hover:bg-indigo-600/50 hover:border-indigo-400 transition-all rounded-xl text-slate-200"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}