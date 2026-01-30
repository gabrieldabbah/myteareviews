import { useState, useMemo } from 'react';
import { QUESTIONS, PERSONALITIES, getPersonalityKey } from '../data/teasonality_data';
import { Leaf, RefreshCcw, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { useTeaData } from '../hooks/useTeaData';
import type { Tea } from '../types';

const Teasonality = () => {
    // Data
    const { teas } = useTeaData();

    // State
    const [step, setStep] = useState(0); // 0-5 = Questions, 6 = Result, 7 = Easter Egg, 8 = Banned
    const [scores, setScores] = useState({ 0: 0, 1: 0, 2: 0 }); // Axis scores
    const [history, setHistory] = useState<number[]>([]);
    const [forcedResult, setForcedResult] = useState<string | null>(null);

    const handleAnswer = (axisIndex: 0 | 1 | 2, value: number) => {
        const newHistory = [...history, value];
        setHistory(newHistory);

        setScores(prev => ({
            ...prev,
            [axisIndex]: prev[axisIndex] + value
        }));

        if (step === 5) {
            // Check for uniformity (all 1s, all 0s, or all -1s)
            // Note: newHistory has 6 elements now
            const allSame = newHistory.every(v => v === newHistory[0]);
            if (allSame) {
                setStep(7); // Extra Question
                return;
            }
            setStep(6);
        } else {
            setStep(prev => prev + 1);
        }
    };

    const handleEasterEggAnswer = (answer: 'yes' | 'no') => {
        if (answer === 'yes') {
            setForcedResult('xxx');
            setStep(6);
        } else {
            setStep(8); // Banned
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setScores({ 0: 0, 1: 0, 2: 0 });
        setHistory([]);
        setForcedResult(null);
    };

    // Result Calculation
    const resultKey = forcedResult || (step === 6 ? getPersonalityKey(scores[0], scores[1], scores[2]) : null);
    const personality = resultKey ? PERSONALITIES[resultKey] : null;

    // Recommendation Logic
    const recommendations = useMemo(() => {
        if (!personality || teas.length === 0) return [];

        const [kEnergy, kAdventure, kFlavor] = personality.key.split('');
        const usedNames = new Set<string>();
        const recs: Tea[] = [];

        // Helper: Get random item from array
        const pickRandom = (arr: Tea[]) => {
            if (arr.length === 0) return null;
            return arr[Math.floor(Math.random() * arr.length)];
        };

        // Define filters
        // Energy: E (High Caff >= 2) vs C (Low/No Caff < 2)
        const filterEnergy = (t: Tea) => {
            if (kEnergy === 'x') return true;
            return kEnergy === 'E' ? (t.caffeine !== undefined && t.caffeine >= 2) : (t.caffeine !== undefined && t.caffeine < 2);
        };

        // Adventure: A (Fun/Blends/Botanical) vs C (Classic: Black, Green, Oolong, Puerh, White)
        const filterAdventure = (t: Tea) => {
            if (kAdventure === 'x') return true;
            const isClassic = ['Green', 'Black', 'Oolong', 'Puerh', 'Pu-erh'].includes(t.type);
            // A = Non-Classic, C = Classic
            return kAdventure === 'C' ? isClassic : !isClassic;
        };

        // Flavor: B (Bitter/Sweetness < 2) vs S (Sweetness >= 2)
        const filterFlavor = (t: Tea) => {
            if (kFlavor === 'x') return true;
            return kFlavor === 'B' ? (t.sweetness !== undefined && t.sweetness < 2) : (t.sweetness !== undefined && t.sweetness >= 2);
        };

        // 1. Energy Slot
        const energyCandidates = teas
            .filter(t => !usedNames.has(t.name) && filterEnergy(t))
            .slice(0, 5);
        const energyPick = pickRandom(energyCandidates);

        if (energyPick) {
            recs.push(energyPick);
            usedNames.add(energyPick.name);
        }

        // 2. Adventure Slot
        const advCandidates = teas
            .filter(t => !usedNames.has(t.name) && filterAdventure(t))
            .slice(0, 5);
        const advPick = pickRandom(advCandidates);

        if (advPick) {
            recs.push(advPick);
            usedNames.add(advPick.name);
        }

        // 3. Flavor Slot
        const flavorCandidates = teas
            .filter(t => !usedNames.has(t.name) && filterFlavor(t))
            .slice(0, 5);
        const flavorPick = pickRandom(flavorCandidates);

        if (flavorPick) {
            recs.push(flavorPick);
            usedNames.add(flavorPick.name);
        }

        // Fillers (random from top 10 remaining)
        while (recs.length < 3) {
            const available = teas.filter(t => !usedNames.has(t.name)).slice(0, 10);
            const filler = pickRandom(available);
            if (!filler) break;
            recs.push(filler);
            usedNames.add(filler.name);
        }

        return recs.slice(0, 3);
    }, [personality, teas]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">

            {/* Quiz Container */}
            <div className="w-full max-w-4xl">

                {step < 6 && (
                    <div className="max-w-2xl mx-auto space-y-8">
                        {/* Title */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-serif text-white mb-2">Find your Teasonality!</h1>
                            <div className="flex justify-center items-center text-sm font-medium text-text-muted/60 uppercase tracking-widest gap-4">
                                <span>Question {step + 1} / 6</span>
                                <div className="h-px w-8 bg-white/10"></div>
                                <span className={clsx(
                                    step < 2 ? "text-tea-green" :
                                        step < 4 ? "text-blue-400" :
                                            "text-orange-400"
                                )}>
                                    {step < 2 ? "Energy" : step < 4 ? "Adventure" : "Flavor"}
                                </span>
                            </div>
                        </div>

                        {/* Question Box with Rounded Outline */}
                        <div className="bg-surface/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                            {/* Subtle internal glow based on axis */}
                            <div className={clsx(
                                "absolute inset-0 opacity-10 blur-3xl transition-colors duration-700",
                                step < 2 ? "bg-tea-green" : step < 4 ? "bg-blue-500" : "bg-orange-500"
                            )} />

                            {/* Question Text */}
                            <div className="text-center space-y-6 relative z-10 fade-in">
                                <h2 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight">
                                    {QUESTIONS[step].text}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 relative z-10">
                                {QUESTIONS[step].options.map((opt, idx) => {
                                    // Determine styling based on value
                                    const isPositive = opt.value === 1; // Green
                                    const isNegative = opt.value === -1; // Red
                                    const isNeutral = opt.value === 0; // Gray

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(QUESTIONS[step].axisIndex, opt.value)}
                                            className={clsx(
                                                "group/btn flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02]",
                                                "bg-black/20 border-white/5 hover:border-opacity-50 hover:shadow-lg",
                                                isPositive && "hover:border-green-400/50 hover:bg-green-900/20",
                                                isNegative && "hover:border-red-400/50 hover:bg-red-900/20",
                                                isNeutral && "hover:border-slate-400/50 hover:bg-slate-800/20"
                                            )}
                                        >
                                            <div className={clsx(
                                                "p-4 rounded-full transition-transform duration-500 group-hover/btn:rotate-12",
                                                isPositive && "bg-green-500/10 text-green-400",
                                                isNegative && "bg-red-500/10 text-red-400",
                                                isNeutral && "bg-slate-500/10 text-slate-400"
                                            )}>
                                                <Leaf className="w-8 h-8 fill-current" />
                                            </div>

                                            <div className="space-y-1 text-center">
                                                <span className={clsx(
                                                    "text-lg font-bold leading-snug block",
                                                    isPositive && "text-green-100 group-hover/btn:text-green-300",
                                                    isNegative && "text-red-100 group-hover/btn:text-red-300",
                                                    isNeutral && "text-slate-100 group-hover/btn:text-slate-300"
                                                )}>
                                                    {opt.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Easter Egg: Extra Question */}
                {step === 7 && (
                    <div className="max-w-2xl mx-auto space-y-8 fade-in">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-serif text-white mb-2">Just one last thing...</h1>
                            <p className="text-text-muted">We need to know.</p>
                        </div>

                        <div className="bg-surface/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl text-center space-y-12">
                            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">Do you enjoy tea?</h2>

                            <div className="flex justify-center gap-8">
                                <button
                                    onClick={() => handleEasterEggAnswer('yes')}
                                    className="w-32 h-32 rounded-full bg-green-500/20 border-2 border-green-500/50 hover:bg-green-500/40 hover:scale-105 transition-all flex items-center justify-center group"
                                >
                                    <span className="text-2xl font-bold text-green-400 group-hover:text-green-200">YES</span>
                                </button>
                                <button
                                    onClick={() => handleEasterEggAnswer('no')}
                                    className="w-32 h-32 rounded-full bg-red-500/20 border-2 border-red-500/50 hover:bg-red-500/40 hover:scale-105 transition-all flex items-center justify-center group"
                                >
                                    <span className="text-2xl font-bold text-red-400 group-hover:text-red-200">NO</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Easter Egg: Banned Screen */}
                {step === 8 && (
                    <div className="max-w-2xl mx-auto text-center space-y-8 fade-in animate-in zoom-in duration-300">
                        <div className="p-12 rounded-[3rem] bg-red-950/40 border-[3px] border-red-500/50 shadow-[0_0_100px_rgba(239,68,68,0.2)] relative overflow-hidden">
                            <div className="absolute inset-0 repeating-linear-gradient-45 from-red-500/5 to-red-500/5 10px, transparent 10px, transparent 20px" />

                            <h1 className="text-6xl md:text-8xl font-black text-red-500 tracking-tighter mb-4 glitch-effect">BANNED</h1>

                            <div className="space-y-4 relative z-10">
                                <p className="text-xl text-red-200 font-mono uppercase tracking-widest">Access Denied</p>
                                <p className="text-red-300/80">Reason: <strong className="text-red-100">Bad Taste</strong></p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-red-500/20 relative z-10">
                                <p className="text-sm text-red-400/60 italic mb-6">(Just kidding)</p>
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Okay, okay, I actually like tea; let me retake the quiz
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result View */}
                {step === 6 && personality && (
                    <div className="fade-in animate-in slide-in-from-bottom-8 duration-700 space-y-12">
                        {/* Result Card */}
                        <div className="bg-surface/30 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
                                {/* Avatar (Left) */}
                                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-tea-green/20 to-primary-500/20 rounded-full blur-2xl animate-pulse" />
                                        <img
                                            src={`/media/avatars/${personality.key}.png`}
                                            alt={personality.name}
                                            className="relative w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        {/* Fallback circle */}
                                        <div className="absolute inset-0 rounded-full border-2 border-white/10 flex items-center justify-center -z-10 bg-white/5">
                                            <span className="text-6xl font-serif text-white/10 opacity-50">{personality.key}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content (Right) */}
                                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-tea-green/80 font-mono tracking-widest text-sm uppercase">Your Teasonality</h3>
                                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main leading-tight">
                                            {personality.name}
                                        </h1>
                                        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 font-mono text-sm">
                                            Type: {personality.key}
                                        </div>
                                    </div>

                                    <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-lg">
                                        {personality.description}
                                    </p>

                                    <div className="pt-8">
                                        <button
                                            onClick={resetQuiz}
                                            className="px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all hover:scale-105 shadow-lg hover:shadow-primary-500/20 flex items-center gap-3 mx-auto md:mx-0"
                                        >
                                            <RefreshCcw className="w-5 h-5" /> Retake Quiz
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        {recommendations.length > 0 && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-backwards">
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-serif text-tea-green font-bold">Recommended for You</h3>
                                    <p className="text-text-muted text-sm">Based on your {personality.name} profile</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {recommendations.map((tea, idx) => (
                                        <div key={tea.name} className="group relative rounded-3xl overflow-hidden bg-surface/40 backdrop-blur-xl border border-white/10 hover:border-primary-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="p-6 space-y-4 relative">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-text-main group-hover:text-primary-400 transition-colors">{tea.name}</h4>
                                                        <span className="text-xs uppercase tracking-wider text-text-muted/60">{tea.brand}</span>
                                                    </div>
                                                    <div className="px-2 py-1 rounded-lg bg-black/20 border border-white/5 text-xs font-mono text-tea-green">
                                                        {idx === 0 ? 'Energy' : idx === 1 ? 'Adventure' : 'Flavor'} Match
                                                    </div>
                                                </div>

                                                <p className="text-sm text-text-muted line-clamp-2">
                                                    {tea.description}
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] uppercase tracking-wider text-white/50">{tea.type}</span>
                                                        {tea.ppp && <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/50">${tea.ppp.toFixed(2)}</span>}
                                                    </div>
                                                    <a
                                                        href={tea.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Disclaimer */}
                        <div className="text-center pt-8 pb-4 opacity-40 hover:opacity-100 transition-opacity">
                            <p className="text-xs text-text-muted italic max-w-lg mx-auto leading-relaxed">
                                Disclaimer: The "Teasonality" assessment is designed for entertainment and flavor exploration purposes only. It is not a psychological profile nor scientifically validated. Please enjoy your tea responsibly.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teasonality;
