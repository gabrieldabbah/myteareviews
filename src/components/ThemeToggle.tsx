import { Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { clsx } from 'clsx';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                "relative w-16 h-8 rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/50 border",
                theme === 'dark'
                    ? "bg-stone-900 border-stone-800" // Deep dark track
                    : "bg-orange-50 border-orange-200" // Light warm track
            )}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? "Switch to Light Mode (Black Tea)" : "Switch to Dark Mode (White Tea)"}
        >
            {/* Thumb */}
            <div className={clsx(
                "absolute top-0.5 left-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center border",
                theme === 'dark'
                    ? "translate-x-8 bg-stone-200 border-stone-100 text-[#5D4037]" // White Tea: Silver leaf, brown text/icon? No, Silver background, Dark Brown leaf
                    : "translate-x-0 bg-[#3E2723] border-[#2c1b18] text-orange-100" // Black Tea: Dark Brown background, Light leaf
            )}>
                <Leaf className={clsx("w-3.5 h-3.5 fill-current", theme === 'dark' ? "text-stone-700" : "text-orange-100")} />
            </div>
        </button>
    );
};

export default ThemeToggle;
