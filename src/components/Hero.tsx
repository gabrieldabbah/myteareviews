import { Link } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';


const Hero = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Fade out quickly: completely gone by 300px scroll
            const progress = Math.min(window.scrollY / 300, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Opacity goes from 1 to 0
    const indicatorOpacity = 1 - scrollProgress;

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center z-0 md:sticky md:top-0" style={{ marginBottom: '0px' }}>

            {/* SVG Glow - Fixed to this section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] -z-10 pointer-events-none opacity-40 dark:opacity-20">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="50" fill="url(#greenGlow)" />
                </svg>
                <svg width="0" height="0">
                    <defs>
                        <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto max-w-4xl text-center space-y-10 px-4 mb-20">
                <h1 className="text-5xl md:text-7xl font-bold text-text-main tracking-tight leading-tight drop-shadow-sm">
                    Find your perfect <span className="text-primary-500 underline decoration-primary-500/30 underline-offset-8 decoration-4">cup of tea</span>.
                </h1>

                <div className="space-y-3">
                    <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed font-light">
                        Honest reviews, simple rankings, no ads.
                    </p>
                    <p className="text-lg md:text-xl text-primary-500 font-medium">
                        by Gabriel Dabbah
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <Link
                        to="/discover"
                        className="w-full sm:w-auto px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-xl shadow-primary-900/10 flex items-center justify-center gap-3 group"
                    >
                        <Search className="w-6 h-6" />
                        Find your tea *
                    </Link>
                    <Link
                        to="/teasonality"
                        className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-primary-500/30 text-primary-600 dark:text-primary-400 rounded-2xl font-bold text-xl hover:bg-primary-500/5 hover:border-primary-400 hover:text-primary-500 dark:hover:text-primary-200 transition-all flex items-center justify-center gap-3"
                    >
                        <Sparkles className="w-6 h-6" />
                        Discover your Teasonality *
                    </Link>
                </div>
                <p className="text-slate-500 text-sm font-medium tracking-wide pb-10 max-w-xs mx-auto">
                    *for free, no registration required
                </p>
            </div>

            {/* Scroll Indicator - Fades out on scroll */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-4 transition-opacity duration-300 select-none pointer-events-none"
                style={{ opacity: indicatorOpacity }}
            >
                <div className="text-sm font-handwriting text-primary-600 dark:text-primary-400 -mb-1 transform -rotate-2">
                    Quick view of my rankings
                </div>
                {/* Curved Dotted Line */}
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform translate-y-2">
                    {/* Horizontal em-dashes curving left and up */}
                    <path
                        d="M55 5 C 20 5, 5 20, 5 35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        className="text-primary-500/60"
                    />
                    <path
                        d="M5 35 L 2 30 M 5 35 L 8 30"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-primary-500/60"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
