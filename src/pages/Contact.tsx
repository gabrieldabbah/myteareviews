const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-text-main mb-6">Contact</h1>
            <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                Have a tea suggestion or just want to say hi?
            </p>
            <a href="mailto:contact@myteareviews.com" className="text-primary-500 hover:text-primary-400 font-medium text-lg underline">
                contact@myteareviews.com
            </a>
        </div>
    );
};

export default Contact;
