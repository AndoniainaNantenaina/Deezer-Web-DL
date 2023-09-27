import { useEffect, useState } from 'react';
import 'animate.css'

export default function Download() {

    useEffect(() => {
        if (window.localStorage.getItem("user") && arlToken.length === 0) {
            setArlToken(JSON.parse(window.localStorage.getItem("user") as any)["arl"])
            console.log("User logged In !")
        }
    }, [])

    const [loading, setLoading] = useState(false)
    const [listening, setListening] = useState<boolean>(false);

    const [arlToken, setArlToken] = useState('')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const [detail, setDetail] = useState<any|null>(null)

    const [type, setType] = useState("track")

    const secondToTime = (second: number) : string => {
        const hours = Math.floor(second / 3600);
        
        const minutes = Math.floor((second - (hours * 3600)) / 60);
        const seconds = second - (hours * 3600) - (minutes * 60);

        const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        return timeString;
    }

    const handleSearch = async () => {
        setLoading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/search/${type}/${query}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.code === 200) {
                setResults(data.data);
            }
        })

        console.log(results);

        setLoading(false);
    }

    const downloadFile = async (id: string) => {

        const arl = arlToken;

        setLoading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arl}/download/${id}`)
        .then((res) => res.blob())
        .then((responseBlob) => {
            let download_file_name = ""

            if (responseBlob.type === "application/zip") {
                download_file_name = `${detail["title"]}.zip`;

                const url = window.URL.createObjectURL(new Blob([responseBlob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', download_file_name);
                document.body.appendChild(link);
                link.click();

            } else if (responseBlob.type === "audio/mpeg") {
                download_file_name = `${detail["title"]}.mp3`;

                const url = window.URL.createObjectURL(new Blob([responseBlob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', download_file_name);
                document.body.appendChild(link);
                link.click();

            } else {
                alert("An error occured while downloading the file. Please try again later.");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("An error occured while downloading the file. Please try again later.");
        })

        setLoading(false);
    }

    const streamFile = async () => {
        let audioElement = document.getElementById('audio-element') as HTMLAudioElement | null

        if (audioElement) {
            audioElement.pause()
            audioElement.currentTime = 0
            audioElement.play()
        }
    }

    return(
        <div className='flex flex-col gap-2 p-2'>
            {
                detail && (
                    <div className="absolute backdrop-blur-md h-screen w-screen top-0 right-0 flex flex-row items-center justify-center">
                        <div className='p-2 bg-blue-900 text-white flex flex-col rounded-3xl h-screen md:h-auto gap-2 animate__animated animate__faster animate__zoomIn'>

                            <audio id='audio-element' src={detail['preview']} className='hidden' />

                            <img src={detail['album']['cover_big']} alt='detail-cover' className='rounded-lg' />

                            <div className='flex flex-row justify-between items-center p-4'>
                                <div className='flex flex-col'>
                                    <h1 className='text-lg md:text-2xl font-bold px-2'>{detail['title']}</h1>
                                    <h1 className='px-2'>{detail['artist']['name']}</h1>
                                </div>
                                <h1>{secondToTime(detail['duration'])}</h1>
                            </div>

                            <div className='flex flex-row justify-around px-10 py-5'>
                                <button onClick={() => setDetail(null)}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='h-8'>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                                
                                <button disabled={listening} onClick={() => streamFile()} className='flex flex-col bg-blue-400 hover:bg-blue-600 disabled:bg-blue-950 text-white p-4 rounded-full items-center'>
                                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='h-8'>
                                        <path clipRule="evenodd" fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"></path>
                                    </svg>
                                </button>

                                <button onClick={() => downloadFile(detail['id'])} disabled={loading} className={`${loading === true && 'animate__animated animate__infinite animate__heartBeat text-green-500'}`}>
                                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='h-8'>
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"></path>
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }

            <div className='flex flex-row gap-0 w-full justify-center'>
                <input className='p-2 rounded-l-lg text-black' placeholder='Search' onChange={e => setQuery(e.target.value)} value={query} />
                <button className='p-2 bg-purple-700 rounded-r-lg flex flex-row items-center gap-1' onClick={handleSearch}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='h-5'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                    {loading ? 'Searching' : 'Search'}
                </button>
            </div>
            <div className='flex flex-row justify-between p-4'>
                <button className={`${type === 'track' && "p-2 border-2 rounded-lg"}`} onClick={() => setType('track')}>Track</button>
                <button className={`${type === 'album' && "p-2 border-2 rounded-lg"}`} onClick={() => setType('album')}>Album</button>
                <button className={`${type === 'artist' && "p-2 border-2 rounded-lg"}`} onClick={() => setType('artist')}>Artist</button>
                <button className={`${type === 'playlist' && "p-2 border-2 rounded-lg"}`} onClick={() => setType('playlist')}>Playlist</button>
            </div>
            {
                (results.length !== 0) && (
                    <div className='flex flex-col gap-2'>
                        {
                            results.map((res) => (
                                <div className='flex flex-row justify-between py-2 px-6 bg-purple-900 text-white items-center text-center rounded-xl'>
                                    <img src={res['album']['cover']} key={res['title']} alt='album-cover' className='h-12 rounded-lg' />
                                    <div>
                                        <h1>{res['title']}</h1>
                                        <h1>{res['artist']['name']}</h1>
                                    </div>
                                    <button onClick={() => setDetail(res)}>
                                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='h-5'>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}