import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Main = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [arlToken, setArlToken] = useState<string>('')
    const handleConnectByArl = async () => {
        setLoading(true);
        
        if (arlToken.length > 0) {
            await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/user`)
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 200) {
                    window.localStorage.setItem("user", JSON.stringify(data.user))
                    navigate("/home/download", { replace: true });
                } else {
                    alert("Invalid ARL token!")
                }
            })
            .catch((err) => {
                alert("Invalid ARL token!")
            })
        } else {
            alert("Please enter your ARL token!")
        }

        setLoading(false);

    }

    return(
        <div className="h-screen bg-slate-800 text-white items-center flex flex-col justify-center gap-2">
            <p className="text-2xl font-bold">Welcome to</p>
            <h1 className="text-4xl font-bold">DEEDL</h1>
            <p className="text-xl">Your preferred Deezer music downloader</p>

            <div className="flex flex-col gap-1">
                <input value={arlToken} onChange={e => setArlToken(e.target.value)} type="text" placeholder="Enter your ARL token" className="p-2 rounded-xl bg-slate-700 text-white" />
                <button disabled={loading} onClick={handleConnectByArl} className="p-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white">
                    {
                        loading ? "Connecting..." : "Connect"
                    }
                </button>
            </div>
        </div>
    );
}
