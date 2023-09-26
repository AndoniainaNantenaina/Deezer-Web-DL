export const Profile = () => {
    return (
        <div className="flex flex-col h-full gap-2 bg-slate-700 text-white p-2">
            <h1>User profile</h1>
            <div className="flex flex-col items-center gap-3">
                <img src={
                    JSON.parse(window.localStorage.getItem("user") as any)["image"]
                } alt="Avatar" className="rounded-full w-20 h-20" />
                <h1 className="text-xl flex flex-col gap-1 items-center">
                    <p className="text-sm">Connected as </p>
                    {
                        JSON.parse(window.localStorage.getItem("user") as any)["name"]
                    }
                </h1>
                <button onClick={() => {
                    window.localStorage.removeItem("user")
                    window.location.href = "/"
                } } className="p-2 rounded-xl bg-red-800 hover:bg-red-900 text-white">Disconnect</button>
            </div>
        </div>
    )
}