export default function Result(props: {type: string, results: any[]}) {

    if (props.type === "track") {
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
                            <img src={result["album"]["cover_medium"]} alt="Album Cover" className="w-20 h-20 rounded-xl" />
                            <h3>{result["title"]}</h3>
                            <h3>{result["artist"]["name"]}</h3>
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
