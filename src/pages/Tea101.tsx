import { Leaf, Droplets, Sun, Wind, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tea101 = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 overflow-hidden relative">

            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-4xl mx-auto relative">

                {/* Intro */}
                <div className="text-center mb-24 space-y-6 fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium border border-primary-500/20">
                        <Leaf className="w-4 h-4" />
                        <span>Tea 101</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-white font-bold tracking-tight">
                        The Journey of the Leaf
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        Welcome to the world of tea. It’s simpler than you think, yet deeper than you can imagine. Let's start from the ground up.
                    </p>
                </div>

                {/* Timeline / Story Steps */}
                <div className="space-y-32 relative">

                    {/* Central Line (Desktop) - Simplified visual guide */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/30 to-transparent -translate-x-1/2 hidden md:block" />

                    {/* Step 1: The Plant */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 group">
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-1">
                            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm hover:border-primary-500/30 transition-colors shadow-xl">
                                <Leaf className="w-12 h-12 text-primary-500 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">It All Starts With One Plant</h3>
                                <p className="text-text-muted leading-relaxed">
                                    Believe it or not, <strong>all true tea</strong> comes from a single plant species: <em>Camellia sinensis</em>.
                                    Whether it's Green, Black, or White tea, it's the same leaf. The difference is just how it's treated after picking.
                                </p>
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-background z-10 hidden md:block shadow-[0_0_20px_rgba(34,197,94,0.5)]" />

                        <div className="w-full md:w-1/2 order-2 md:order-2 pl-8 md:pl-12">
                            <span className="text-9xl font-serif text-white/5 absolute -top-10 -z-10 select-none">01</span>
                        </div>
                    </div>

                    {/* Step 2: Tea vs Infusion */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 group">
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-end pr-8 md:pr-12">
                            <span className="text-9xl font-serif text-white/5 absolute -top-10 -z-10 select-none right-0 md:right-1/2 md:mr-12">02</span>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-background z-10 hidden md:block shadow-[0_0_20px_rgba(96,165,250,0.5)]" />

                        <div className="w-full md:w-1/2 flex justify-center md:justify-start order-1 md:order-2">
                            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm hover:border-blue-400/30 transition-colors shadow-xl">
                                <Droplets className="w-12 h-12 text-blue-400 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Tea vs. Infusion</h3>
                                <p className="text-text-muted leading-relaxed">
                                    If it doesn't have <em>Camellia sinensis</em>, it's technically a <strong>Tisane</strong> (or herbal infusion).
                                    Chamomile, Peppermint, and Rooibos are delicious, but they are cousins, not siblings, to true tea.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Oxidation (The Spectrum) */}
                    <div className="relative flex flex-col items-center gap-12">
                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full border-4 border-background z-10 hidden md:block shadow-[0_0_20px_rgba(251,146,60,0.5)]" />

                        <div className="bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 w-full max-w-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-green-200 via-orange-400 to-red-900 opacity-50" />

                            <div className="text-center mb-10">
                                <Wind className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">The Magic of Air</h3>
                                <p className="text-text-muted max-w-xl mx-auto">
                                    The main difference between tea types is <strong>Oxidation</strong>: how long the leaves are allowed to react with oxygen before being dried.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[
                                    { name: "White", color: "bg-stone-100", text: "text-stone-800", desc: "Unprocessed. Delicate." },
                                    { name: "Green", color: "bg-green-500", text: "text-white", desc: "Heated early. Grassy." },
                                    { name: "Oolong", color: "bg-amber-500", text: "text-white", desc: "Half-way. Complex." },
                                    { name: "Black", color: "bg-red-700", text: "text-white", desc: "Fully oxidized. Bold." },
                                    { name: "Pu'erh", color: "bg-stone-800", text: "text-stone-300", desc: "Fermented. Earthy." },
                                ].map(type => (
                                    <div key={type.name} className={`${type.color} p-4 rounded-xl text-center md:aspect-[3/4] flex flex-col justify-center items-center gap-2 hover:scale-105 transition-transform cursor-default shadow-lg`}>
                                        <span className={`font-bold ${type.text}`}>{type.name}</span>
                                        <span className={`text-xs ${type.text} opacity-80`}>{type.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Your Taste */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 group">
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-1">
                            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm hover:border-purple-400/30 transition-colors shadow-xl">
                                <Palette className="w-12 h-12 text-purple-400 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Finding Your Profile</h3>
                                <p className="text-text-muted leading-relaxed mb-4">
                                    There is no "best" tea. It's about what you need in the moment.
                                </p>
                                <ul className="space-y-2 text-sm text-text-muted">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Need Focus? Try Gyokuro (Green).</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Waking up? Try Assam (Black).</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Exploring? Try Tieguanyin (Oolong).</li>
                                </ul>
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full border-4 border-background z-10 hidden md:block shadow-[0_0_20px_rgba(192,132,252,0.5)]" />

                        <div className="w-full md:w-1/2 order-2 md:order-2 pl-8 md:pl-12">
                            <span className="text-9xl font-serif text-white/5 absolute -top-10 -z-10 select-none">04</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-20">
                        <div className="inline-flex flex-col items-center gap-6">
                            <h2 className="text-3xl font-bold text-white">Ready to explore?</h2>
                            <Link
                                to="/discover"
                                className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-900/10 flex items-center gap-2"
                            >
                                Start Discovery Quiz
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Tea101;
