const About = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-primary-900 mb-6">About My Tea Reviews</h1>
            <div className="prose prose-slate prose-lg text-slate-600">
                <p>
                    I like tea. Always have. I like to try new teas and I thought: why not start ranking every tea I try? So I started ranking every tea I try. Enjoy!
                </p>
                <p className="mt-4">
                    The rankings are all my personal opinion. I was not paid and am not earning any cent from this site. I just like tea and I want to share my opinions with you. If you want to recommend me a tea to try, check Contact page. I've received multiple recommendations to try strawberry tea, however I could not find a single one to buy anywhere.
                </p>
            </div>
        </div>
    );
};

export default About;
