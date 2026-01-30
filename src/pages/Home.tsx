import Hero from '../components/Hero';
import TeaList from '../components/TeaList';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="space-y-12">
            <SEO
                title="Home"
                description="Discover the best teas, ranked and reviewed. Find your perfect brew with our expert guide."
            />
            <Hero />
            <div id="ranking" className="container mx-auto px-4 pb-12">
                <TeaList />
            </div>
        </div>
    );
};

export default Home;
