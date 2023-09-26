import { useState } from "react";
import 'animate.css'

export default function Result(props: {type: string, results: any[], arlToken: string}) {

    const [showDownload, setShowDownload] = useState(false);
    const [toDownload, setToDownload] = useState<any|null>(null);
    const [downloading, setDownloading] = useState(false);
    
    const [listening, setListening] = useState(false);

    const streamFile = async () => {
        
        if (listening) return;
        setListening(true);
        let audio = new Audio(toDownload["preview"]);
        await audio.play()
        .then(() => {
            setListening(false);
        })

    }

    const secondToTime = (second: number) : string => {
        const hours = Math.floor(second / 3600);
        
        const minutes = Math.floor((second - (hours * 3600)) / 60);
        const seconds = second - (hours * 3600) - (minutes * 60);

        const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        return timeString;
    }

    const downloadFile = async (id: string) => {

        const arl = props.arlToken;

        setDownloading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arl}/download/${id}`)
        .then((res) => res.blob())
        .then((responseBlob) => {
            let download_file_name = ""

            if (responseBlob.type === "application/zip") {
                download_file_name = `${toDownload["title"]}.zip`;

                const url = window.URL.createObjectURL(new Blob([responseBlob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', download_file_name);
                document.body.appendChild(link);
                link.click();

            } else if (responseBlob.type === "audio/mpeg") {
                download_file_name = `${toDownload["title"]}.mp3`;

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

        setDownloading(false);
        setShowDownload(false);
    }

    if (props.type === "track") {

        if (showDownload) {
            return(
                <div style={{
                    backgroundImage: `url(${toDownload["album"]["cover_big"]})`,  
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "1rem",
                }} className="w-full bg-slate-700 text-white rounded-lg flex flex-col justify-center animate__animated animate__faster animate__fadeInRight">
                    <div className="w-full h-full backdrop-blur rounded-lg">
                        <div className="flex flex-col md:flex-row md:text-xl gap-2 items-start md:items-center p-2">
                            <img src={toDownload["album"]["cover_big"]} alt="Album Cover" className="rounded-xl h-auto w-auto md:h-24 md:w-24" />
                            <p>
                            <h1>{toDownload["title"]}</h1>
                            <h1>by {toDownload["artist"]["name"]}</h1>
                            </p>
                        </div>
                    
                        <div className="flex flex-row gap-2 justify-between p-1">

                            <button 
                            disabled={downloading}
                            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg w-full"
                            onClick={() => downloadFile(toDownload["id"])}>
                                {downloading ? (
                                    <p className="flex flex-col items-center gap-1 w-full justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z" clipRule="evenodd" />
                                    </svg>                          
                                    Downloading...
                                    </p>
                                ) : (
                                    <p className="flex flex-col items-center gap-1 w-full justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z" clipRule="evenodd" />
                                    </svg>                          
                                    Download
                                    </p>
                                )}
                            </button>
                            
                            <button 
                            disabled={listening}
                            onClick={() => streamFile()}
                            className="bg-green-400 hover:bg-green-600 text-white p-2 rounded-lg w-full">
                                <p className="flex flex-col items-center gap-1 w-full justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                {listening ? "Listening..." : "Listen"}
                                </p>
                            </button>

                            <button 
                            className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-lg w-full"
                            onClick={() => setShowDownload(false)}>
                                <p className="flex flex-col items-center gap-1 w-full justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return(
            <div className="flex flex-col gap-2">
                <div>
                    Found {props.results.length} result(s)
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {
                    props.results.map((result: any) => (
                        <li key={result["id"]} className="flex flex-col gap-1 items-center text-center p-2 bg-slate-700 rounded-xl justify-between">
                            <img src={result["album"]["cover_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <h3>{result["title"]}</h3>
                            <h3>{result["artist"]["name"]}</h3>
                            <h3>{secondToTime(result["duration"])}</h3>
                            <button
                            className="flex flex-row gap-1 group p-2 bg-purple-500 rounded-lg hover:bg-purple-800"
                            onClick={() => {
                                setShowDownload(true);
                                setToDownload(result);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clip-rule="evenodd" />
                                </svg>
                                <p>Download</p>
                            </button>            
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    } else if (props.type === "album") {
        return(
            <div>
                <div className="flex flex-row justify-between p-2">
                    <h1>Cover</h1>
                    <h1>Title</h1>
                    <h1>Artist</h1>
                </div>
                <ul className="flex flex-col gap-1">
                {
                    props.results.map((result: any) => (
                        <li key={result["id"]} className="flex flex-row justify-between items-center p-2 bg-slate-700 text- rounded-lg">
                            <img src={result["cover_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <h3>{result["title"]}</h3>
                            <h3>{result["artist"]["name"]}</h3>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    } else if (props.type === "playlist") {
        return(
            <div>
                <div className="flex flex-row justify-between p-2">
                    <h1>Cover</h1>
                    <h1>Title</h1>
                    <h1>Tracks</h1>
                </div>
                <ul className="flex flex-col gap-1">
                {
                    props.results.map((result: any) => (
                        <li key={result["id"]} className="flex flex-row justify-between items-center p-2 bg-slate-700 text- rounded-lg">
                            <img src={result["picture_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <div className="flex flex-col gap-1 items-end">
                                <h3 className="font-bold text-end">{result["title"]}</h3>
                                <h3>By {result["user"]["name"]}</h3>
                                <h3>{result["nb_tracks"]} track(s)</h3>
                            </div>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    } else if (props.type === "artist") {
        return(
            <div>
                <div className="flex flex-row justify-between p-2">
                    <h1>Cover</h1>
                    <h1>Name</h1>
                    <h1>Bio</h1>
                </div>
                <ul className="flex flex-col gap-1">
                {
                    props.results.map((result: any) => (
                        <li key={result["id"]} className="flex flex-row justify-between items-center p-2 bg-slate-700 text- rounded-lg">
                            <img src={result["picture_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <h3 className="font-bold">{result["name"]}</h3>
                            <div className="flex flex-col gap-1">
                                <h3>{result["nb_album"]} album(s)</h3>
                                <h3>{result["nb_fan"]} fan(s)</h3>
                            </div>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    }

    return (
        <div>
        </div>
    );
}
