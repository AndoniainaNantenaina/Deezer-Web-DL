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
            <div className="flex flex-col justify-center items-center">
                <h1>Loading data...</h1>
            </div>
        );
    }

    if (params.type === 'track') {
        return (
            <div>
                <h1>Track n° {params.id}</h1>
                {/* <h1>{detailData['info']['DATA']['SNG_TITLE']}</h1> */}
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
    
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>404 Not Found.</h1>
        </div>
    );
}