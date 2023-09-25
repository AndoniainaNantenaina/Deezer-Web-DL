import { useContext, useState } from 'react';
import Result from './Result';
import { AuthContext } from '../provider/AuthProvider';

import 'animate.css'

export default function Download() {

    const context = useContext(AuthContext);

    const [loading, setLoading] = useState(false)
    const [arlToken, setArlToken] = useState('')
    const [userInformation, setUserInformation] = useState(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const [type, setType] = useState("track")

    const getUserInformation = async () => {
        setLoading(true);

        if (arlToken.length > 0) {
            await fetch("https://deezer-web-dl-andoniainanantenaina.vercel.app/" + arlToken + "/user").then((res) =>
            res.json().then((data) => {
                if (data.code === 200) {
                    setUserInformation(data.user);
                    console.log(data.user);
                }
            }));
        }

        setLoading(false);
    }

    const handleSearch = async () => {
        setLoading(true);

        await fetch(`https://deezer-web-dl-andoniainanantenaina.vercel.app/${arlToken}/search/${type}/${query}`).then((res) => {
            res.json().then((data) => {
                if (data.code === 200) {
                    console.log(data);
                    setResults(data.data);
                }
            })
        })

        setLoading(false);
    }

    if (userInformation !== null) {
        return(
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row p-2 gap-2 items-center bg-blue-700 rounded-xl animate__animated animate__fadeInLeft animate__faster'>
                    <img src={userInformation["image"]} alt="Avatar" className="rounded-full w-20 h-20" />
                    <div className='flex flex-col'>
                        <h4><span className='text-green-500 font-bold'>Connected</span> as</h4>
                        <h4 className='text-xl'>{userInformation["name"]}</h4>
                    </div>
                </div>
                
                <div className='flex flex-row gap-3'>
                    <label htmlFor="track" className='flex flex-row items-center gap-2'>
                        <input type="radio" id="track" name="type" value="track" onChange={() => {
                            setType("track");
                            setResults([]);
                        }} checked={type === "track"} />
                        Track
                    </label>

                    <label htmlFor="album" className='flex flex-row items-center gap-2'>
                        <input type="radio" id="album" name="type" value="album" onChange={() => {
                            setType("album");
                            setResults([]);
                        }} checked={type === "album"} />
                        Album
                    </label>

                    <label htmlFor="playlist" className='flex flex-row items-center gap-2'>
                        <input type="radio" id="playlist" name="type" value="playlist" onChange={() => {
                            setType("playlist");
                            setResults([]);
                        }} checked={type === "playlist"} />
                        Playlist
                    </label>

                    <label htmlFor="artist" className='flex flex-row items-center gap-2'>
                        <input type="radio" id="artist" name="type" value="artist" onChange={() => {
                            setType("artist");
                            setResults([]);
                        }} checked={type === "artist"} />
                        Artist
                    </label>
                </div>
                
                <div className='flex flex-row gap-2 w-full md:w-auto'>
                    <input required type="text" placeholder={`${type} query`} 
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-2 border-gray-500 text-black rounded-md p-2" />

                    <button 
                    disabled={loading}
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {loading ? "Searching..." : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        )}
                    </button>
                </div>

                <Result results={results} type={type} arlToken={arlToken} />
            </div>
        );
    }

    return(
        <div className="flex flex-row gap-2 justify-around">
            <div className='flex flex-col gap-2'>
                <p>Download your preferred song from deezer easily.</p>
                <input required onChange={(e) => setArlToken(e.target.value)} type="text" placeholder="ARL Token" className="border-2 border-gray-500 text-black rounded-md p-2" />
                <button 
                onClick={() => getUserInformation()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? "Connecting..." : "Connect"}
                </button>
            </div>
        </div>
    );
}