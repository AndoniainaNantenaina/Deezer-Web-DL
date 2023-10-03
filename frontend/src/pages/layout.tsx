import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HomeIconOutlined, HomeIconSolid, SearchIconOutlined, SearchIconSolid, UserProfileOutlined, UserProfileSolid } from '../components/Icons';

export default function Layout() {

    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem('user') === null) {
            return navigate('/auth')
        }
    }, [])

    const user = JSON.parse(window.localStorage.getItem('user') || '{}')

    return(
        <div className='grid md:grid-cols-6 grid-cols-1'>

            <div className='hidden h-screen md:block md:col-span-1w-full'>
                <div className='flex flex-col gap-2 bg-gray-950 text-white h-full'>
                    <h1 className='text-lg font-roboto font-bold'>DEEDL</h1>

                    <Link to='/dashboard' className={`${window.location.pathname === '/dashboard' ? 'bg-gray-800' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'} p-2 rounded-lg mx-1 text-sm`}>
                        <h1 className='flex flex-row gap-1 items-center'>
                            <span>{HomeIconSolid}</span>
                            Dashboard
                        </h1>
                    </Link>

                    <Link to='/dashboard/search' className={`${window.location.pathname === '/dashboard/search' ? 'bg-gray-800' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'} p-2 rounded-lg mx-1 text-sm`}>
                        <button className='flex flex-row gap-1 items-center'>
                            <span>{SearchIconOutlined}</span>
                            Search
                        </button>
                    </Link>

                    <Link to='/dashboard/profile' className={`${window.location.pathname === '/dashboard/profile' ? 'bg-gray-800' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'} p-2 rounded-lg mx-1 text-sm`}>
                        <h1 className='flex flex-row gap-1 items-center'>
                            <span>{UserProfileOutlined}</span>
                            Profile
                        </h1>
                    </Link>
                </div>
            </div>
            
            <div className="bg-black text-gray-400 col-span-1 md:col-span-5">
                
                <Outlet />

                <div id='bottom-nav-bar' className='sm:hidden flex flex-row justify-evenly fixed bottom-0 right-0 left-0 bg-gray-800 font-inter'>
                    <Link to='/dashboard' className='p-2'>
                        <button className={`flex flex-col gap-1 items-center py-1 px-2 rounded-lg ${window.location.pathname === '/dashboard' && "text-white"}`}>
                            {window.location.pathname === '/dashboard' ? HomeIconSolid : HomeIconOutlined}
                            <h5 className='text-sm'>Home</h5>
                        </button>
                    </Link>
                    <Link to='/dashboard/search'  className='p-2'>
                        <button className={`flex flex-col gap-1 items-center py-1 px-2 rounded-lg ${window.location.pathname === '/dashboard/search' && "text-white"}`}>
                            {window.location.pathname === '/dashboard/search' ? SearchIconSolid : SearchIconOutlined}
                            <h5 className='text-sm'>Search</h5>
                        </button>
                    </Link>
                    <Link to='/dashboard/profile'  className='p-2'>
                        <button className={`flex flex-col gap-1 items-center py-1 px-2 rounded-lg ${window.location.pathname === '/dashboard/profile' && "text-white"}`}>
                            {window.location.pathname === '/dashboard/profile' ? UserProfileSolid : UserProfileOutlined}
                            <h5 className='text-sm'>Profile</h5>
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}