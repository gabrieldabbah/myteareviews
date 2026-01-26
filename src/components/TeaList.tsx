import { useState } from 'react';
import { useTeaData } from '../hooks/useTeaData';
import { ExternalLink, Loader2, Info } from 'lucide-react';
import { clsx } from 'clsx';
import type { Tea } from '../types';

type SortConfig = {
    key: keyof Tea | 'rank';
    direction: 'asc' | 'desc';
};

const TeaList = () => {
    const { teas, loading, error } = useTeaData();
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'score', direction: 'desc' });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32 text-primary-500 relative z-10">
                <Loader2 className="w-12 h-12 animate-spin opacity-50" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-400 text-center py-20 font-medium relative z-10">Error loading teas: {error}</div>;
    }

    const sortedTeas = [...teas].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) return 0;

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key: keyof Tea | 'rank') => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
        }));
    };

    return (
        <div className="w-full relative z-20 pt-10 pb-32">

            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex items-center gap-3 mb-8 px-2 backdrop-blur-sm p-4 rounded-3xl inline-flex bg-background/5">
                    <h2 className="text-3xl font-bold text-text-main tracking-tight">My Ranked Teas</h2>
                    <div className="relative group mt-1">
                        <Info className="w-5 h-5 text-text-muted hover:text-primary-500 cursor-help transition-colors" />
                        <div className="absolute left-0 bottom-full mb-3 w-72 p-4 bg-surface border border-border rounded-xl shadow-xl text-sm text-text-muted opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                            <p>Disclaimer: This ranking is based on personal taste and opinion. I was not paid to review any of these teas.</p>
                        </div>
                    </div>
                </div>

                {/* Desktop Table - Apple 2026 Aesthetic */}
                <div className="hidden md:block overflow-hidden rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 backdrop-blur-3xl bg-white/80 dark:bg-slate-900/80">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/50 dark:bg-black/40 text-text-muted text-sm uppercase tracking-widest font-semibold border-b border-white/20">
                            <tr>
                                <th
                                    className="px-8 py-6 w-24 text-center cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('rank')}
                                    title="Sort by Rank"
                                >
                                    #
                                </th>
                                <th
                                    className="px-6 py-6 cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('name')}
                                    title="Sort by Name"
                                >
                                    Name
                                </th>
                                <th
                                    className="px-6 py-6 cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('brand')}
                                    title="Sort by Brand"
                                >
                                    Brand
                                </th>
                                <th
                                    className="px-6 py-6 cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('type')}
                                >
                                    Type
                                </th>
                                <th
                                    className="px-6 py-6 text-center cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('score')}
                                    title="Sort by Score"
                                >
                                    Score
                                </th>
                                <th className="px-6 py-6 w-[35%]">Description</th>
                                <th
                                    className="px-6 py-6 cursor-pointer hover:text-primary-500 transition-colors select-none"
                                    onClick={() => handleSort('ppp')}
                                    title="Sort by Price"
                                >
                                    Price (350ml)
                                </th>
                                <th className="px-8 py-6 text-right">Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-text-main">
                            {sortedTeas.map((tea) => (
                                <tr key={`${tea.name}-${tea.brand}`} className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-6 text-center font-bold text-text-muted group-hover:text-primary-500/80 transition-colors">
                                        {tea.rank}
                                    </td>
                                    <td className="px-6 py-6 font-semibold text-lg group-hover:text-primary-500 transition-colors">
                                        {tea.name}
                                    </td>
                                    <td className="px-6 py-6 text-text-muted font-medium">
                                        {tea.brand}
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 text-sm font-medium leading-none px-3 py-1 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10",
                                            tea.type === 'Green' ? "text-green-600 dark:text-green-400 border-green-200/20" :
                                                tea.type === 'Black' ? "text-stone-600 dark:text-stone-300 border-stone-200/20" :
                                                    tea.type === 'White' ? "text-yellow-600 dark:text-yellow-100 border-yellow-200/20" :
                                                        tea.type === 'Oolong' ? "text-orange-600 dark:text-orange-300 border-orange-200/20" :
                                                            "text-purple-600 dark:text-purple-300 border-purple-200/20"
                                        )}>
                                            {tea.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={clsx(
                                            "text-xl font-bold font-mono tracking-tight",
                                            tea.score >= 8 ? "text-primary-600 dark:text-primary-400" :
                                                tea.score >= 6 ? "text-yellow-600 dark:text-yellow-500" : "text-red-500 dark:text-red-400"
                                        )}>
                                            {tea.score === 10 ? 10 : tea.score % 1 === 0 ? <>{tea.score}<span className="text-transparent/0">.0</span></> : tea.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-base text-text-muted leading-relaxed font-light">
                                        "{tea.description}"
                                    </td>
                                    <td className="px-6 py-6 font-mono text-base text-text-main font-medium">
                                        ${tea.ppp.toFixed(2)}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {tea.link && tea.link !== 'null' ? (
                                            <a
                                                href={tea.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center p-2.5 text-primary-500 hover:bg-primary-500 hover:text-white rounded-xl transition-all duration-300"
                                                title="View Tea"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        ) : (
                                            <span className="text-slate-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-6">
                    {sortedTeas.map((tea) => (
                        <div key={`${tea.name}-${tea.brand}`} className="bg-surface/60 backdrop-blur-2xl p-6 rounded-[2rem] shadow-lg border border-white/10 flex flex-col gap-4 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">#{tea.rank}</span>
                                        <span className="text-xs font-semibold text-primary-500">
                                            {tea.type}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-text-main text-xl tracking-tight">{tea.name}</h3>
                                    <p className="text-sm text-primary-500/80 font-medium">{tea.brand}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={clsx(
                                        "font-bold text-3xl font-mono",
                                        tea.score >= 8 ? "text-primary-500" :
                                            tea.score >= 6 ? "text-yellow-600" : "text-red-500"
                                    )}>
                                        {tea.score}
                                    </span>
                                    <span className="text-sm text-text-main font-mono font-medium">${tea.ppp.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="relative pl-4 border-l-2 border-primary-500/50">
                                <p className="text-base text-text-muted italic font-light leading-relaxed">"{tea.description}"</p>
                            </div>

                            {tea.link && tea.link !== 'null' && (
                                <a
                                    href={tea.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-primary-50/50 border border-primary-200 text-primary-600 font-bold rounded-2xl hover:bg-primary-500 hover:text-white hover:border-transparent transition-all duration-300 text-base group"
                                >
                                    View Product <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeaList;
