import { useState } from "react";
import {
    Outlet
} from "react-router-dom";
import { Profile } from "../components/Profile";
import { SideNav } from "../components/SideNav";
import { SmNav } from "../components/SmNav";
import 'animate.css'

export default function Layout() {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showProfile, setShowProfile] = useState<boolean>(false)

    return(
        <div className="w-screen h-screen fixed bg-slate-800 text-white grid grid-cols-1 md:grid-cols-4">
            <div className="hidden md:block">
                <SideNav />
            </div>
            <div className="flex flex-col md:col-span-3 overflow-scroll">

                {
                    showMenu && (
                        <div className="absolute w-full bg-slate-800 animate__animated animate__faster animate__fadeInLeft sm:hidden">
                            <button className="flex flex-row p-4" onClick={() => setShowMenu(false)}>
                                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <SideNav />
                        </div>
                    )
                    
                }

                {
                    showProfile && (
                        <div className="absolute w-full bg-slate-800 animate__animated animate__faster animate__fadeInRight sm:hidden">
                            <button className="flex flex-row p-4" onClick={() => setShowProfile(false)}>
                                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <Profile />
                        </div>
                    )
                }

                <SmNav 
                menuCallBack={() => {
                    setShowMenu(true);
                }}
                profileCallBack={() => {
                    setShowProfile(true);
                }} />

                <Outlet/>
            </div>

        </div>
    );
}