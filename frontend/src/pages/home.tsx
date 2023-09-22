import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div className="bg-slate-900 text-white p-2 flex flex-col gap-2 relative h-screen">
            <div className="bg-gradient-to-br from-purple-800 to-purple-600 text-white p-4 rounded-xl">
                <h1 className="text-xl">Welcome to Deezer DL</h1>
                <p className="underline underline-offset-4">Your preferred online Deezer Music Downloader !</p>
                <Link to="/auth">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >Login with ARL</button>
                </Link>
            </div>
        </div>
    );
}
