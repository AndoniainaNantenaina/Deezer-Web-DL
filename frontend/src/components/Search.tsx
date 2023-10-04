import { useState, useEffect } from "react";
import { SearchIconSolid } from "./Icons";
import 'animate.css'
import { Link } from "react-router-dom";

export default function Search() {

    useEffect(() => {
        if (window.localStorage.getItem("user") && arlToken.length === 0) {
            setArlToken(JSON.parse(window.localStorage.getItem("user") as any)["arl"])
            console.log("User logged In !")
        }
    }, [])

    const [loading, setLoading] = useState<boolean>(false);
    const [arlToken, setArlToken] = useState<string>('');

    const [query, setQuery] = useState<string>('');
    const [queryType, setQueryType] = useState<string>('track');
    const [res, setRes] = useState<any[]>([]);

    const handleSearch = async () => {
        setLoading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/search/${queryType}/${query}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("RESULT : ", data.data)
            if (data.code === 200) {
                setRes(data.data);
            }
        })

        setLoading(false);
    }

    return (
        <div className={`flex flex-col p-2 h-screen overflow-y-auto`}>
            <span className="flex flex-row gap-2">
                <input type="text" placeholder="Your Music." 
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="p-2 font-roboto bg-gray-700 focus:bg-gray-800 border-none rounded-lg border-white w-full text-white focus:outline-none" />
                
                <button 
                onClick={handleSearch}
                className="p-2 bg-purple-secondary hover:bg-purple-primary text-white rounded-lg flex flex-row gap-1 items-center">
                    Search
                    {SearchIconSolid}
                </button>
            </span>

            <div className="flex flex-row gap-2 font-inter text-sm p-2">
                <button
                onClick={() => setQueryType('track')} 
                className={`${queryType === 'track' && 'font-bold text-white'}`}>Tracks</button>
                <button
                onClick={() => setQueryType('album')} 
                className={`${queryType === 'album' && 'font-bold text-white'}`}>Albums</button>
                <button
                onClick={() => setQueryType('artist')} 
                className={`${queryType === 'artist' && 'font-bold text-white'}`}>Artists</button>
                <button
                onClick={() => setQueryType('playlist')} 
                className={`${queryType === 'playlist' && 'font-bold text-white'}`}>Playlists</button>
            </div>

            <Result result={res} loading={loading} type={queryType} />
        </div>
    );
}

const Result = (props: {result: any[], loading: boolean, type: string}) => {

    if (props.loading) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate__animated animate__rotateIn animate__infinite">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                </svg>

                <h1>Loading...</h1>
            </div>
        );
    } else {
        if (props.result.length === 0) {
            return (
                <div className="flex flex-col h-full items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
                    </svg>

                    <h1>Nothing to show</h1>
                </div>
           );
        }
    }

    if (props.type === 'track') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {
                    props.result.map((res) => (
                        <Link to={`/dashboard/track/${res.id}`}>
                            <div className="flex flex-col gap-2 p-2 text-white rounded-lg">
                                <img src={res.album.cover_medium} alt="Cover" className="rounded-lg md:transition-transform md:hover:scale-105" />
                                <h1 className="font-bold font-inter">{res.title}</h1>
                                <h1 className="text-xs">{res.artist.name}</h1>
                            </div>
                        </Link>
                    ))
                }
            </div>
        );
    }

    return (
        <div>
            <h1>{props.result.length} {props.type}(s) found.</h1>
        </div>
    );
}