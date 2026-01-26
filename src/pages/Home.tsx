import Hero from '../components/Hero';
import TeaList from '../components/TeaList';

const Home = () => {
    return (
        <div className="space-y-12">
            <Hero />
            <div id="ranking" className="container mx-auto px-4 pb-12">
                <TeaList />
            </div>
        </div>
    );
};

export default Home;
