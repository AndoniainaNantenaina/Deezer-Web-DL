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