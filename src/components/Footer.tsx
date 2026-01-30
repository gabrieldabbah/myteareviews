import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-border py-12 mt-24 bg-background relative z-10 transition-colors duration-300">
            <div className="container mx-auto px-8 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12">
                    {/* Left Side */}
                    <div className="flex flex-col justify-start text-center md:text-left max-w-md w-full gap-4">
                        <h3 className="text-xl font-bold text-text-main flex items-center justify-center md:justify-start gap-2">
                            My Tea Reviews
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                            This compilation is based on personal opinion. Prices and links are updated manually and may not reflect current market status. Last price update on Jan 20, 2026.
                        </p>
                        <p className="text-slate-600 dark:text-slate-500 text-xs">
                            Content provided for informational purposes only. I have received no financial compensation for reviews.
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col justify-start text-center md:text-right w-full md:w-auto gap-4">
                        {/* Match height with header roughly */}
                        <a href="#" className="flex items-center justify-center md:justify-end gap-2 text-primary-500 hover:text-primary-400 font-medium transition-colors text-base group">
                            Support this project <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        </a>



                        <div className="flex gap-6 justify-center md:justify-end">
                            <Link to="/terms" className="text-slate-600 dark:text-slate-500 text-xs hover:text-text-main cursor-pointer transition-colors">Terms of Service</Link>
                            <Link to="/privacy" className="text-slate-600 dark:text-slate-500 text-xs hover:text-text-main cursor-pointer transition-colors">Privacy Policy</Link>
                        </div>
                    </div>
                </div>

                {/* Centered Copyright */}
                <div className="text-center pt-8 border-t border-border/30">
                    <p className="text-slate-600 dark:text-slate-500 text-xs">
                        © {new Date().getFullYear()} Gabriel Dabbah. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
