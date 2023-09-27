export default function LandingPage() {
    return (
        <div className="w-screen">
            <div id="home" className="bg-gradient-to-br from-black to-purple-primary text-white h-screen flex flex-col gap-2 items-center justify-center">
                <h1>Welcome to Deedl platform.</h1>
                <p>Where you got your preferred music for free !</p>
                <button className="bg-purple-primary hover:bg-purple-secondary p-2 rounded-lg">
                    GET STARTED
                </button>
            </div>
        </div>
    );
}
