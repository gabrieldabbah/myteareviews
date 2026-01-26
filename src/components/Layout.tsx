import React from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Background from './Background.tsx';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen text-text-main relative selection:bg-primary-500/30 font-sans">
            <Background />
            <Header />
            {/* Main content container */}
            <main className="flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
