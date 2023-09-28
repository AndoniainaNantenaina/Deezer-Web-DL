export default function LandingPage() {
    return (
        <div className="w-screen">
            <div id="home" className="bg-gradient-to-br from-black to-purple-primary text-white h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="font-roboto font-bold text-3xl">DEEDL Music Downloader</h1>
                
                <h1 className="text-4xl md:text-6xl text-center font-martian font-bold">Free Music For Everyone</h1>
                
                <button className="bg-purple-primary hover:bg-purple-secondary px-4 py-3 rounded-lg font-inter font-roboto">
                    LET'S GET STARTED
                </button>
            </div>
        </div>
    );
}
