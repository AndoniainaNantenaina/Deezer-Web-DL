import { useEffect, useState } from "react";

export default function Dashboard() {

    const [mainPlaylist, setMainPlaylist] = useState<any[]>([])

    useEffect(() => {
        if (mainPlaylist.length === 0) {
            getMainPlaylist()
        }
    }, [])

    const arlToken = JSON.parse(window.localStorage.getItem('user') || '{}').arl

    const getMainPlaylist = async () => {

        if (window.sessionStorage.getItem('mainPlaylist') !== null) {
            setMainPlaylist(JSON.parse(window.sessionStorage.getItem('mainPlaylist') || '[]'))
            return
        }

        await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/search/playlist/Happy Mood`)
        .then(res => res.json())
        .then(data => {
            setMainPlaylist(data.data)
            window.sessionStorage.setItem('mainPlaylist', JSON.stringify(data.data))
        })
        .catch(err => console.log(err))
    }

    if (window.localStorage.getItem('user') === null) {
        return (
            <div className="h-screen flex flex-row items-center justify-center">
                Not connected yet!
            </div>
        )
    }

    if (mainPlaylist.length === 0) {
        return (
            <div className="flex flex-row h-screen bg-transparent items-center justify-center text-white font-martian text-xl">Loading...</div>
        );
    }

    return (
        <div className="bg-transparent h-screen overflow-y-auto">
            
            <div className="px-2 py-3 top-0 left-0 bg-gray-950 text-gray-300 flex flex-row items-center">
                <h2 className="text-white">
                    Hi, <span className="font-bold">{JSON.parse(window.localStorage.getItem('user') || '{}').name}</span>
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-x-3 gap-y-5 md:first-letter:grid-cols-4 lg:grid-cols-6 p-2">
                {
                    mainPlaylist.map((playlist, index) => (
                        <TrackCard playlist={playlist} key={index} />
                    ))
                }
            </div>
            
        </div>
    );
}

const TrackCard = (props: {playlist: any}) => {
    return (
        <div className="flex flex-col gap-2 p-2 text-white rounded-lg">
            <img src={props.playlist.picture_medium} alt="Cover" className="rounded-lg" />
            <h1 className="font-bold font-inter">{props.playlist.title}</h1>
            <h1 className="text-xs">{props.playlist.user.name}</h1>
        </div>
    );
}