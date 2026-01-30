const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-text-main mb-8">Privacy Policy</h1>

            <div className="prose prose-invert max-w-none text-text-muted space-y-6">
                <p>
                    Last edited: Jan, 26, {new Date().getFullYear()}
                </p>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">1. Introduction</h2>
                    <p>
                        Welcome to My Tea Reviews. I respect your privacy and am committed to protecting it.
                        This policy explains the simple, non-intrusive ways data is handled on this site.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">2. Data Collection & Cookies</h2>
                    <p>
                        This website uses only essential cookies necessary for its functioning (e.g., remembering your theme preference).
                        I do not track your personal activities, sell your data to third parties, or use invasive analytics.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">3. No Ads or Tracking</h2>
                    <p>
                        This site is ad-free. I do not use advertising networks that track you across the web.
                    </p><br></br>
                    <p>
                        "But I see ads!!"
                    </p><br></br>
                    <p>
                        Either you are hallucinating, or you have malware on your pc. Take care.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main mb-3">4. Contact</h2>
                    <p>
                        If you have any questions, feel free to reach out via the Contact page.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
