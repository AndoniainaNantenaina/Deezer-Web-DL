import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'animate.css'

export default function AuthenticationPage() {

    const [loading, setLoading] = useState<boolean>(false)

    // Check if user is already logged in
    useEffect(() => {
        if (window.localStorage.getItem('user') !== null) {
            return navigate('/dashboard')
        }
    }, [])

    // ARL Token state
    const [arlToken, setArlToken] = useState<string>('');

    // Navigate function
    const navigate = useNavigate();

    // Handle connect function
    const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setLoading(true);

        if (arlToken.length === 0) {
            return alert("Please enter your ARL token!")
        }

        await fetch(`https://deezer-dl-api.onrender.com/${arlToken}/user`)
        .then((res) => res.json())
        .then((data) => {
            if (data.code === 200) {
                setLoading(false);
                window.localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/dashboard", { replace: true });
            } else {
                alert("Invalid ARL token!")
                setLoading(false);
            }
        })
    }

    return (
        <div className="h-screen bg-gradient-to-br from-black bg-purple-secondary text-white flex flex-col gap-2 md:p-2 items-center md:justify-center transition-colors delay-75">
            <div className="sm:hidden w-full bg-transparent text-white p-4 flex flex-row items-center justify-start">
                <button onClick={() => navigate('/')}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                    </svg>
                </button>
            </div>
            <h1 className="font-roboto font-bold text-3xl mt-5 md:mt-0 animate__animated animate__backInDown animate__faster">Connect</h1>
            <p className="font-roboto font-thin">Use your arl token to connect</p>

            <form className="py-5 flex flex-col gap-2" onSubmit={handleConnect}>
                <label className="font-roboto font-bold text-sm">
                    ARL Token
                    <input value={arlToken} onChange={(e) => setArlToken(e.target.value)} type="text" className="bg-transparent border-b-2 border-white w-full text-white focus:outline-none focus:border-purple-primary" />
                </label>

                <button type="submit" className="bg-gray-light text-purple-secondary font-bold font-martian backdrop-blur-lg p-2">
                    {loading ? "Connecting..." : "Connect with ARL"}
                </button>
            </form>
        </div>
    );
}
