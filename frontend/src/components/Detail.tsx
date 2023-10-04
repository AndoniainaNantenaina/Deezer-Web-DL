import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {

    
    useEffect(() => {
                
        if (detailData === null) {
            getDetailData();
        }
        
    }, [])
    
    const getDetailData = async () => {
        setLoading(true)

        const arl = JSON.parse(window.localStorage.getItem("user") as any)["arl"]

        await fetch(`https://deezer-dl-api.onrender.com/${arl}/${params.type}/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            setDetailData(data.data);
            setLoading(false);
        })
        .catch((err) => console.log(err))
    }

    const downloadFile = async (id: string) => {

        const arl = JSON.parse(window.localStorage.getItem("user") as any)["arl"];

        setLoading(true);

        await fetch(`https://deezer-dl-api.onrender.com/${arl}/download/${id}`)
        .then((res) => res.blob())
        .then((responseBlob) => {
            let download_file_name = ""

            if (responseBlob.type === "application/zip") {
                download_file_name = `${detailData["SNG_TITLE"]}.zip`;

                const url = window.URL.createObjectURL(new Blob([responseBlob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', download_file_name);
                document.body.appendChild(link);
                link.click();

            } else if (responseBlob.type === "audio/mpeg") {
                download_file_name = `${detailData["SNG_TITLE"]}.mp3`;

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

    const [loading, setLoading] = useState<boolean>(false);

    const [detailData, setDetailData] = useState<any|null>(null);
    const params = useParams<{id: string, type: string}>();
    
    if (loading) {
        return (
            <div className="flex flex-col h-screen justify-center items-center">
                <h1>Loading data...</h1>
            </div>
        );
    }

    if (detailData !== null) {
        if (params.type === 'track') {
            return (
                <div className="p-2 h-screen md:h-auto">

                    <audio id='audio-element' src={detailData['MEDIA'][0]['HREF']} className='hidden' />

                    <img 
                    className="rounded-lg"
                    key={detailData["ALB_TITLE"]} 
                    src={`https://api.deezer.com/album/${detailData['ALB_ID']}/image`} 
                    alt="cover" />
                    
                    <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">{detailData['SNG_TITLE']}</h1>
                    <h1>In {detailData['ALB_TITLE']}</h1>
                    <h1 className="text-white md:text-xl">
                    {
                        (detailData['ARTISTS'] as any[]).map(
                            artist => artist['ART_NAME'] + ' '
                        )
                    }
                    </h1>
                    <div className="flex flex-row justify-between md:justify-start md:gap-2 p-2">
                        <button 
                        disabled={loading}
                        onClick={() => downloadFile(detailData['SNG_ID'])}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button 
                        disabled={loading}
                        onClick={() => streamFile()}
                        className="bg-purple-primary hover:bg-purple-secondary text-white rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            );
        }

        else if (params.type === 'album') {
            return (
                <div>
                </div>
            );
        }

        else if (params.type === 'playlist') {
            return (
                <div>
                </div>
            );
        }

        else if (params.type === 'artist') {
            return (
                <div>
                </div>
            );
        }
    }
    
    return (
        
        <div className="flex flex-col items-center justify-center">
            <h1>404 Not Found.</h1>
        </div>
    );
}