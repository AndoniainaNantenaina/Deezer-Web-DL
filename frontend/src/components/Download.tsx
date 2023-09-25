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
                <div className='flex flex-row p-2 gap-2 items-center justify-center md:justify-normal bg-blue-700 rounded-xl animate__animated animate__fadeInLeft animate__faster'>
                    <img src={userInformation["image"]} alt="Avatar" className="rounded-full w-20 h-20" />
                    <div className='flex flex-col'>
                        <h4><span className='text-green-500 font-bold'>Connected</span> as</h4>
                        <h4 className='text-xl'>{userInformation["name"]}</h4>
                    </div>
                </div>
                
                <div className='flex flex-row gap-1 justify-center'>
                    <button
                    disabled={type === "track"}
                    onClick={() => {
                        setType("track")
                        setResults([])
                    }}
                    className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-700 group flex flex-col items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                        <p>Tracks</p>
                    </button>

                    <button
                    disabled={type === "album"}
                    onClick={() => {
                        setType("album")
                        setResults([])
                    }}
                    className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-700 group flex flex-col items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                        </svg>
                        <p>Albums</p>
                    </button>

                    <button
                    disabled={type === "playlist"}
                    onClick={() => {
                        setType("playlist")
                        setResults([])
                    }}
                    className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-700 group flex flex-col items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p>Playlists</p>
                    </button>

                    <button
                    disabled={type === "artist"}
                    onClick={() => {
                        setType("artist")
                        setResults([])
                    }}
                    className='text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-700 group flex flex-col items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <p>Artists</p>
                    </button>
                </div>
                
                <div className='flex flex-row gap-2 w-full md:w-auto justify-center'>
                    <input required type="text" placeholder={`${type} query`} 
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 rounded-md text-black" />

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