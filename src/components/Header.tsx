import { Leaf, Github, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useState } from 'react';


const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Discover', path: '/discover' },
        { name: 'Teasonality', path: '/teasonality' },
        { name: 'Tea 101', path: '/tea-101' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-primary-500 hover:text-primary-400 transition-colors group">
                    <div className="bg-primary-500/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Leaf className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-text-main">My Tea Reviews</span>
                </Link>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
                                    location.pathname === item.path
                                        ? "text-primary-500"
                                        : "text-text-muted hover:text-text-main"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="w-px h-6 bg-border/50 hidden md:block" />

                    <a
                        href="https://github.com/gabrieldabbah/myteareviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-main transition-colors hidden md:block"
                        title="View on GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    className="md:hidden text-text-muted hover:text-text-main transition-colors p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-t border-white/10 shadow-2xl animate-in slide-in-from-top-5 duration-200">
                    <nav className="flex flex-col p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "p-4 rounded-xl font-semibold transition-colors flex items-center justify-between",
                                    location.pathname === item.path
                                        ? "bg-primary-500/10 text-primary-500"
                                        : "text-text-muted hover:bg-white/5 hover:text-text-main"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                                {location.pathname === item.path && <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-white/5 mt-2">
                            <a
                                href="https://github.com/gabrieldabbah/myteareviews"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl font-semibold text-text-muted hover:bg-white/5 hover:text-text-main transition-colors flex items-center gap-3"
                            >
                                <Github className="w-5 h-5" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
