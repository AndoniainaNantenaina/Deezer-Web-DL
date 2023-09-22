import { useState } from "react";

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

    const downloadFile = async (id: string) => {

        const arl = props.arlToken;

        setDownloading(true);

        await fetch(`https://deezer-web-dl-andoniainanantenaina.vercel.app/${arl}/download/${id}`)
        .then((res) => res.blob())
        .then((blob) => {
            let download_file_name = ""

            if (blob.type === "application/zip") {
                download_file_name = `${toDownload["title"]}.zip`;
            } else if (blob.type === "audio/mpeg") {
                download_file_name = `${toDownload["title"]}.mp3`;
            }

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', download_file_name);
            document.body.appendChild(link);
            link.click();
        })

        setDownloading(false);
        setShowDownload(false);
    }

    if (props.type === "track") {

        if (showDownload) {
            return(
                <div className="w-full bg-slate-700 text-white p-2 rounded-lg flex flex-col gap-2 justify-center">
                    <div className="flex flex-row gap-2">
                        <img src={toDownload["album"]["cover_big"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                        <p>
                        <h1>{toDownload["title"]}</h1>
                        <h1>by {toDownload["artist"]["name"]}</h1>
                        </p>
                    </div>
                    
                    <button 
                    disabled={downloading}
                    className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
                    onClick={() => downloadFile(toDownload["id"])}>
                        {downloading ? "Downloading..." : (
                            <p className="flex flex-row gap-1 w-full justify-center">
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
                    className="bg-green-400 hover:bg-green-600 text-white p-2 rounded-lg">
                        <p className="flex flex-row gap-1 w-full justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        {listening ? "Listening..." : "Listen"}
                        </p>
                    </button>

                    <button 
                    className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-lg"
                    onClick={() => setShowDownload(false)}>
                        Cancel
                    </button>
                </div>
            );
        }

        return(
            <div>
                <div className="flex flex-row justify-between p-2">
                    <h1>Cover</h1>
                    <h1>Title</h1>
                    <h1>Artist</h1>
                    <h1>Download</h1>
                </div>
                <ul className="flex flex-col gap-1">
                {
                    props.results.map((result: any) => (
                        <li key={result["id"]} className="flex flex-row justify-between items-center p-2 bg-slate-700 text- rounded-lg">
                            <img src={result["album"]["cover_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <h3>{result["title"]}</h3>
                            <h3>{result["artist"]["name"]}</h3>
                            <button
                            onClick={() => {
                                setShowDownload(true);
                                setToDownload(result);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-blue-500">
                                <path fill-rule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clip-rule="evenodd" />
                                </svg>
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
