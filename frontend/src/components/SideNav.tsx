import { Link, useNavigate } from "react-router-dom";

export const SideNav = () => {

    const navigation = useNavigate();

    return(
        <div className="flex flex-col gap-1 bg-black h-full">

            <h1 className="text-2xl font-bold flex flex-col items-center p-3">DEEDL</h1>
            <div className="flex flex-col gap-1 justify-between h-full">
                <div>
                    <Link to="/home/download" className="p-2 bg-gray-700 hover:bg-gray-800 flex flex-row items-center justify-center gap-1">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                        </svg>
                        DOWNLOAD
                    </Link>
                    <Link to="/home/about" className="p-2 bg-gray-700 hover:bg-gray-800 flex flex-row items-center justify-center gap-1">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                        </svg>
                        ABOUT
                    </Link>
                </div>
                <div className="p-2">
                    <div className="flex flex-row items-center gap-3 bg-gray-600 hover:bg-gray-700 p-2 rounded-lg">
                        <img src={JSON.parse(window.localStorage.getItem("user") as any)["image"]} alt="Avatar" className="h-7 rounded-full" />
                        <p className="text-sm">
                            {
                                JSON.parse(window.localStorage.getItem("user") as any)["name"]
                            }
                        </p>
                        <button className="p-2" onClick={() => {window.localStorage.removeItem("user"); navigation('/')}}>
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}