const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-text-main mb-8">Terms of Service</h1>

            <div className="prose prose-slate dark:prose-invert max-w-none text-text-muted space-y-6">
                <p>
                    Last edited: Jan, 26, {new Date().getFullYear()}
                </p>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">1. General Info</h2>
                    <p>
                        My Tea Reviews is a personal project where I share my honest opinions on tea.
                        By using this site, you agree to these simple terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">2. Disclaimer</h2>
                    <p>
                        All reviews and rankings are subjective and based solely on my personal taste.
                        I am not paid to promote any specific tea or brand. I do not receive financial compensation for my reviews.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">3. Content</h2>
                    <p>
                        The content on this site is for informational and entertainment purposes only.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfService;
