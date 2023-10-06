import { useState, useEffect } from "react";
import { SearchIconSolid } from "./Icons";
import 'animate.css'
import { Link } from "react-router-dom";
import { Track } from "../types/Track";
import { Album } from "../types/Album";
import { Artist } from "../types/Artist";
import { Playlist } from "../types/Playlist";
import SearchResult from "./SearchResult";

export default function Search() {

    useEffect(() => {

        // Setting ARL TOken value
        if (window.localStorage.getItem("user") && arlToken.length === 0) {
            setArlToken(JSON.parse(window.localStorage.getItem("user") as any)["arl"])
        }

        // Vérification si les données sont déjà mise en cache
        if (window.sessionStorage.getItem(queryType)) {

            console.log(`${queryType} data already in cache`)

            // Vérification par type de recherche
            if (queryType === 'track') {
                const data = JSON.parse(window.sessionStorage.getItem(`${queryType}`) as any) as Track[];

                setTrackResult(data as Track[]);
            }

            if (queryType === 'album') {
                const data = JSON.parse(window.sessionStorage.getItem(`${queryType}`) as any) as Album[];

                setAlbumResult(data as Album[]);
            }

            if (queryType === 'artist') {
                const data = JSON.parse(window.sessionStorage.getItem(`${queryType}`) as any) as Artist[];

                setArtistResult(data as Artist[]);
            }

            if (queryType === 'playlist') {
                const data = JSON.parse(window.sessionStorage.getItem(`${queryType}`) as any) as Playlist[];

                setPlaylistResult(data as Playlist[]);
            }
        }

    }, [])

    const [loading, setLoading]     = useState<boolean>(false);
    const [arlToken, setArlToken]   = useState<string>('');
    const [query, setQuery]         = useState<string>('');
    const [queryType, setQueryType] = useState<string>('track');

    // Les résultats de recherche
    const [trackResult, setTrackResult]         = useState<Track[]>([]);
    const [albumResult, setAlbumResult]         = useState<Album[]>([]);
    const [artistResult, setArtistResult]       = useState<Artist[]>([]);
    const [playlistResult, setPlaylistResult]   = useState<Playlist[]>([]);

    const handleSearch = async () => {
        setLoading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/search/${queryType}/${query}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.code === 200) {
                
                if (queryType === 'track') {
                    setTrackResult(data.data as Track[])

                    // Vider le cache de recherche et le remplacer par le nouveau
                    window.sessionStorage.setItem(`track`, JSON.stringify(data.data));
                }

                if (queryType === 'album') {
                    setAlbumResult(data.data as Album[])
                    
                    // Vider le cache de recherche et le remplacer par le nouveau
                    window.sessionStorage.setItem(`album`, JSON.stringify(data.data));
                }

                if (queryType === 'artist') {
                    setArtistResult(data.data as Artist[])

                    // Vider le cache de recherche et le remplacer par le nouveau
                    window.sessionStorage.setItem(`artist`, JSON.stringify(data.data));
                }

                if (queryType === 'playlist') {
                    setPlaylistResult(data.data as Playlist[])

                    // Vider le cache de recherche et le remplacer par le nouveau
                    window.sessionStorage.setItem(`playlist`, JSON.stringify(data.data));
                }
            }
        })

        setLoading(false);
    }

    const handleChangeType = async (type: string) => {
        setLoading(true);

        setQueryType(type);
        console.log(`Type changed to : ${type}`)
        await handleSearch();
        console.log(`${query} ${queryType} search finished on change.`)

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

            <div className="flex flex-row gap-2 font-inter text-sm p-1 bg-purple-950 m-2 rounded-xl justify-center">
                <button
                disabled={query.length === 0}
                onClick={() => handleChangeType('track')} 
                className={`p-1 rounded-lg ${queryType === 'track' ? 'text-white bg-black disabled:text-gray-500 disabled:bg-gray-800' : ''}`}>Tracks</button>
                <button
                disabled={query.length === 0}
                onClick={() => handleChangeType('album')} 
                className={`p-1 rounded-lg ${queryType === 'album' ? 'text-white bg-black disabled:text-gray-500 disabled:bg-gray-800' : ''}`}>Albums</button>
                <button
                disabled={query.length === 0}
                onClick={() => handleChangeType('artist')} 
                className={`p-1 rounded-lg ${queryType === 'artist' ? 'text-white bg-black disabled:text-gray-500 disabled:bg-gray-800' : ''}`}>Artists</button>
                <button
                disabled={query.length === 0}
                onClick={() => handleChangeType('playlist')} 
                className={`p-1 rounded-lg ${queryType === 'playlist' ? 'text-white bg-black disabled:text-gray-500 disabled:bg-gray-800' : ''}`}>Playlists</button>
            </div>

            <SearchResult 
                albums={albumResult} 
                artists={artistResult} 
                playlists={playlistResult} 
                tracks={trackResult} 
                dataType={queryType}
                loading={loading} />

        </div>
    );
}

// const Result = (props: {result: any | null, loading: boolean, type: string}) => {

//     if (props.loading) {
//         return (
//             <div className="flex flex-col h-full items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate__animated animate__rotateIn animate__infinite">
//                     <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
//                 </svg>

//                 <h1>Loading...</h1>
//             </div>
//         );
//     }

//     if (props.result !== null) {

//         if (props.type === 'track') {

//             if (props.result.track.length === 0) {
//                 return (
//                     <div className="flex flex-col h-full items-center justify-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                             <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
//                         </svg>

//                         <h1>Nothing to show</h1>
//                     </div>
//             );
//             }

//             return (
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//                     {
//                         props.result.track.map((res) => (
//                             <Link to={`/dashboard/track/${res.id}`}>
//                                 <div className="flex flex-col gap-2 p-2 text-white rounded-lg">
//                                     <img src={res.album.cover_medium} alt="Cover" className="rounded-lg md:transition-transform md:hover:scale-105 md:hover:cursor-zoom-in" />
//                                     <h1 className="font-bold font-inter">{res.title}</h1>
//                                     <h1 className="text-xs text-gray-400 font-inter">{res.artist.name}</h1>
//                                 </div>
//                             </Link>
//                         ))
//                     }
//                 </div>
//             );
//         }
        
//         else if (props.type === 'album') {
//             return (
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//                     {
//                         props.result.album.map((res) => (
//                             <Link to={`/dashboard/album/${res.id}`}>
//                                 <div className="flex flex-col gap-2 p-2 text-white rounded-lg">
//                                     <img src={res.cover} alt="Cover" className="rounded-lg md:transition-transform md:hover:scale-105 md:hover:cursor-zoom-in" />
//                                     <h1 className="font-bold font-inter">{res.title}</h1>
//                                     <h1 className="text-xs text-gray-400 font-inter">{res.artist.name}</h1>
//                                 </div>
//                             </Link>
//                         ))
//                     }
//                 </div>
//             );
//         }

//     }

//     return (
//         <div>
//         </div>
//     );
// }