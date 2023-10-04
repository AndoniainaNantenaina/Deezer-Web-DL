import { useParams } from "react-router-dom";

export default function Detail() {

    const params = useParams<{id: string, type: string}>();
    
    if (params.type === 'track') {
        return (
            <div>
                <h1>Track n° {params.id}</h1>
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