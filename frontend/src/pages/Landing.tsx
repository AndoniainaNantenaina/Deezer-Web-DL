import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="w-screen bg-[url('images/landing-bg.jpg')] bg-cover">
            <div id="home" className="bg-gradient-to-r from-black to-transparent text-white h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="font-roboto font-bold text-xl md:text-3xl">DEEDL Music Downloader</h1>
                
                <h1 className="text-4xl md:text-6xl text-center font-martian font-bold">Free Music For Everyone</h1>
                
                <Link to='/auth'>
                <button className="bg-purple-primary hover:bg-purple-secondary px-2 py-1 md:px-4 md:py-3 rounded-lg font-roboto text-sm md:text-lg">
                    LET'S GET STARTED
                </button>
                </Link>
            </div>
        </div>
    );
}
