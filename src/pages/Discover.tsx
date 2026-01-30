import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTeaData } from '../hooks/useTeaData';
import type { Tea } from '../types';
import { clsx } from 'clsx';
import { RefreshCcw, Coffee, Droplets, Leaf, DollarSign, ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

type QuizState = {
    caffeinePref: 'yes' | 'no' | 'neutral' | null;
    likedTypes: string[];
    sweetnessPref: 'sweet' | 'bitter' | 'neutral' | null;
    dislikedTypes: string[];
    maxPrice: number | null;
};

const Discover = () => {
    const { teas, loading } = useTeaData();
    const [step, setStep] = useState(0);
    const [quizState, setQuizState] = useState<QuizState>({
        caffeinePref: null,
        likedTypes: [],
        sweetnessPref: null,
        dislikedTypes: [],
        maxPrice: null
    });

    // Animation state
    const [flash, setFlash] = useState(false);

    // Trigger flash on step change (handled via handlers now, effect clears it)
    useEffect(() => {
        if (flash) {
            const timer = setTimeout(() => setFlash(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Calculate ranked teas based on quiz state
    const rankedTeas = useMemo(() => {
        if (loading || teas.length === 0) return [];

        const scoredTeas = teas.map(tea => {
            const adjustedScore = tea.score;
            let multiplier = 1;

            // 1. Caffeine Logic (0-3 scale)
            // Goal: +/- 15% range.
            // Formula: 1 + (Input * (0.1 * Caffeine - 0.15))
            // Input: Yes (1), No (-1).
            // Example: Yes (1) & High Caff (3) -> 1 + (0.3 - 0.15) = 1.15 (+15%)
            // Example: Yes (1) & No Caff (0) -> 1 + (0 - 0.15) = 0.85 (-15%)
            // Example: No (-1) & High Caff (3) -> 1 - (0.15) = 0.85 (-15%)
            // Example: No (-1) & No Caff (0) -> 1 - (-0.15) = 1.15 (+15%)
            if (quizState.caffeinePref) {
                const inputVal = quizState.caffeinePref === 'yes' ? 1 : quizState.caffeinePref === 'no' ? -1 : 0;

                if (inputVal !== 0) {
                    multiplier *= (1 + (inputVal * (0.1 * tea.caffeine - 0.15)));
                }
            }

            // 2. Liked Types
            if (quizState.likedTypes.includes(tea.type)) {
                multiplier *= 1.1;
            }

            // 3. Sweet vs Bitter (0-3 scale)
            // Same formula: 1 + (Input * (0.1 * Sweetness - 0.15))
            // Pref Sweet (1): High Sweet (3) -> 1.15. Low Sweet (0) -> 0.85.
            if (quizState.sweetnessPref) {
                const inputVal = quizState.sweetnessPref === 'sweet' ? 1 : quizState.sweetnessPref === 'bitter' ? -1 : 0;

                if (inputVal !== 0) {
                    multiplier *= (1 + (inputVal * (0.1 * tea.sweetness - 0.15)));
                }
            }

            // 4. Disliked Types (Removal handles later, but we can nuke score here)
            if (quizState.dislikedTypes.includes(tea.type)) {
                return null;
            }

            // 5. Price
            // "above price set ... -% that is log per cent above"
            if (quizState.maxPrice !== null && tea.ppp > quizState.maxPrice) {
                // Determine percentage above
                const ratio = tea.ppp / quizState.maxPrice; // e.g. 1.5
                multiplier *= (1 / (1 + Math.log2(ratio))); // Stronger decay
            }

            return {
                ...tea,
                adjustedScore: adjustedScore * multiplier
            };
        }).filter(Boolean) as (Tea & { adjustedScore: number })[];

        // Logic: Relative Normalization.
        // If the highest adjusted score is > 10, scale everyone down so the top is 10.
        // If the highest is < 10 (e.g. 9), keep it as is (don't stretch to 10).
        // This prevents "inflation" (clamping at 10) and "initial jump" (9 becoming 10).
        const maxAdjusted = Math.max(...scoredTeas.map(t => t.adjustedScore), 0);
        const scaleFactor = Math.max(10, maxAdjusted); // If max is 11, divide by 11. If max is 9, divide by 10.

        const finalTeas = scoredTeas.map(t => ({
            ...t,
            normalizedScore: (t.adjustedScore / scaleFactor) * 10
        }));

        return finalTeas.sort((a, b) => b.normalizedScore - a.normalizedScore);
    }, [teas, quizState, loading]);


    const handleTypeToggle = (type: string, field: 'likedTypes' | 'dislikedTypes') => {
        setQuizState(prev => {
            const current = prev[field];
            const updated = current.includes(type)
                ? current.filter(t => t !== type)
                : [...current, type];
            return { ...prev, [field]: updated };
        });
        setFlash(true);
    };

    const uniqueTypes = useMemo(() => Array.from(new Set(teas.map(t => t.type))), [teas]);

    // Renders
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 flex flex-col md:flex-row gap-8">
            <SEO
                title="Discover Your Tea"
                description="Take our interactive quiz to find the perfect tea for your taste buds."
            />

            {/* Left Panel: Quiz Interface */}
            <div className="w-full md:w-1/3 min-w-[300px] shrink-0 space-y-8">
                <div className="sticky top-24">
                    <h1 className="text-3xl font-serif text-tea-green mb-6">Find Your Tea</h1>

                    <div className="bg-surface/40 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Back Button within grid */}
                        {step > 0 && (
                            <div className="absolute top-6 right-6 z-10">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white/70 hover:text-white transition-all border border-white/5"
                                    title="Go Back"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {step === 0 && (
                            <div className="space-y-4 fade-in">
                                <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                                    <Coffee className="text-primary-500" /> Caffeine?
                                </h2>
                                <p className="text-text-muted text-sm">Do you need that energy boost?</p>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { label: "Yes, energize me!", val: 'yes' },
                                        { label: "No, I want to relax.", val: 'no' },
                                        { label: "I don't mind.", val: 'neutral' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => {
                                                setQuizState(prev => ({ ...prev, caffeinePref: opt.val as QuizState['caffeinePref'] }));
                                                setStep(1);
                                                setFlash(true);
                                            }}
                                            className={clsx(
                                                "p-4 rounded-xl border text-left transition-all hover:scale-[1.02]",
                                                quizState.caffeinePref === opt.val
                                                    ? "bg-primary-500/20 border-primary-500 text-primary-500"
                                                    : "bg-black/20 border-white/5 text-text-muted hover:bg-black/40"
                                            )}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6 fade-in">
                                <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                                    <Leaf className="text-primary-500" /> Favorites?
                                </h2>
                                <p className="text-text-muted text-sm">Verify the types you know you enjoy.</p>
                                <div className="flex flex-wrap gap-2">
                                    {uniqueTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleTypeToggle(type, 'likedTypes')}
                                            className={clsx(
                                                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                                                quizState.likedTypes.includes(type)
                                                    ? "bg-primary-500 text-white border-primary-500"
                                                    : "bg-transparent text-text-muted border-white/20 hover:border-white/50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(2)} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-colors">
                                    Next
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 fade-in">
                                <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                                    <Droplets className="text-primary-500" /> Flavor Profile
                                </h2>
                                <p className="text-text-muted text-sm">Sweet tooth or bitter truth?</p>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { label: "Sweet & Fruity", val: 'sweet' },
                                        { label: "Bitter & Earthy", val: 'bitter' },
                                        { label: "Balanced / Neutral", val: 'neutral' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => {
                                                setQuizState(prev => ({ ...prev, sweetnessPref: opt.val as QuizState['sweetnessPref'] }));
                                                setStep(3);
                                                setFlash(true);
                                            }}
                                            className="p-4 rounded-xl border border-white/10 bg-black/20 text-left hover:bg-black/40 text-text-main transition-all hover:scale-[1.02]"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 fade-in">
                                <h2 className="text-xl font-bold text-text-main text-red-400 flex items-center gap-2">
                                    🚫 Deal Breakers
                                </h2>
                                <p className="text-text-muted text-sm">Anything you strictly dislike?</p>
                                <div className="flex flex-wrap gap-2">
                                    {uniqueTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleTypeToggle(type, 'dislikedTypes')}
                                            className={clsx(
                                                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                                                quizState.dislikedTypes.includes(type)
                                                    ? "bg-red-500/20 text-red-400 border-red-500"
                                                    : "bg-transparent text-text-muted border-white/20 hover:border-white/50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(4)} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-colors">
                                    Next
                                </button>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6 fade-in">
                                <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                                    <DollarSign className="text-primary-500" /> Price Limit
                                </h2>
                                <p className="text-text-muted text-sm">Max price per cup ($)? Leave empty for no limit.</p>
                                <input
                                    type="number"
                                    step="0.10"
                                    placeholder="e.g. 1.50"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-text-main focus:outline-none focus:border-primary-500 transition-colors"
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        setQuizState(prev => ({ ...prev, maxPrice: isNaN(val) ? null : val }));
                                        setFlash(true);
                                    }}
                                />
                                <button onClick={() => setStep(5)} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-colors">
                                    Finish
                                </button>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="text-center space-y-4 fade-in">
                                <h2 className="text-2xl font-bold text-tea-green">All Done!</h2>
                                <p className="text-text-muted">Your curated list is on the right.</p>
                                <button
                                    onClick={() => {
                                        setStep(0);
                                        setQuizState({ caffeinePref: null, likedTypes: [], sweetnessPref: null, dislikedTypes: [], maxPrice: null });
                                        setFlash(true);
                                    }}
                                    className="flex items-center justify-center gap-2 text-primary-400 hover:text-primary-300 mx-auto"
                                >
                                    <RefreshCcw className="w-4 h-4" /> Start Over
                                </button>
                            </div>
                        )}

                        {step < 5 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {[0, 1, 2, 3, 4].map(s => (
                                    <div key={s} className={clsx("w-2 h-2 rounded-full transition-all", s === step ? "bg-primary-500 w-6" : s < step ? "bg-primary-500/50" : "bg-white/10")} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-8 text-center fade-in delay-100">
                    <p className="text-sm text-text-muted mb-3">Not sure where to start?</p>
                    <Link
                        to="/tea-101"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors border-b border-primary-500/20 hover:border-primary-400/50 pb-0.5"
                    >
                        <Leaf className="w-4 h-4" />
                        New to drinking tea? Click here
                    </Link>
                </div>
            </div>

            {/* Right Panel: Live Ranking */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-text-main">Your Ranking</h2>
                        <p className="text-sm text-text-muted">Updates in real-time</p>
                    </div>

                </div>

                <div className="space-y-3">
                    {rankedTeas.map((tea, idx) => (
                        <div
                            key={tea.name}
                            className={clsx(
                                "group relative rounded-3xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl",
                                flash && "scale-[1.02]"
                            )}
                            style={{
                                animationDelay: `${idx * 50}ms`,
                                opacity: flash ? 0.8 : 1
                            }}
                        >
                            {/* Glass Card */}
                            <div className={clsx(
                                "relative h-full overflow-hidden rounded-3xl bg-surface/60 backdrop-blur-xl p-5 flex items-center justify-between border border-white/20 shadow-lg transition-colors group-hover:bg-surface/70 group-hover:border-white/30",
                                flash && "bg-surface/80 border-white/40"
                            )}>
                                <div className="flex items-center gap-5">
                                    <div className="flex flex-col items-center justify-center w-8 shrink-0">
                                        <div className="text-sm font-bold text-white/40">#{idx + 1}</div>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-lg font-bold text-text-main leading-tight group-hover:text-primary-400 transition-colors">
                                                {tea.name}
                                            </h3>
                                            <span className="text-xs font-medium text-text-muted/80 uppercase tracking-wider">{tea.brand}</span>
                                        </div>

                                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted font-medium">
                                            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                                                {tea.type}
                                            </span>
                                            <span className="text-white/30">•</span>
                                            <span className="text-white/70">${tea.ppp.toFixed(2)}/cup</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right shrink-0 relative">
                                        {/* Score Display */}
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-mono font-bold text-primary-400 leading-none tracking-tight drop-shadow-sm">
                                                {tea.normalizedScore.toFixed(1)}
                                            </div>
                                            {tea.normalizedScore !== tea.score && (
                                                <div className="text-[11px] text-white/70 line-through mt-0.5 font-mono">
                                                    {tea.score}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* External Link */}
                                    <a
                                        href={tea.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/30 text-white/50 hover:text-white transition-all transform hover:scale-110 hover:-rotate-12"
                                        title="View Tea"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>

                                {/* Flash Overlay */}
                                <div className={clsx(
                                    "absolute inset-0 bg-white pointer-events-none mix-blend-overlay transition-opacity duration-300",
                                    flash ? "animate-[flash_0.8s_ease-out_forwards]" : "opacity-0"
                                )} />
                            </div>
                        </div>
                    ))}

                    {rankedTeas.length === 0 && (
                        <div className="text-center py-20 bg-surface/20 rounded-3xl border border-white/5 backdrop-blur-sm text-text-muted">
                            <p className="text-lg">No teas match your strict criteria!</p>
                            <p className="text-sm opacity-60 mt-2">Try relaxing the filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discover;
