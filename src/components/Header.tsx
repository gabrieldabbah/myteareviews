import { Leaf, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Discover', path: '/discover' },
        { name: 'Teasonality', path: '/teasonality' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/10 dark:border-slate-800 transition-all duration-300 shadow-sm">
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
                        href="https://github.com/gabrieldabbah?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-main transition-colors hidden md:block"
                        title="View on GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>

                    <ThemeToggle />
                </div>

                {/* Mobile menu placeholder */}
                <div className="md:hidden">
                    {/* Mobile Menu Trigger would go here */}
                </div>
            </div>
        </header>
    );
};

export default Header;
