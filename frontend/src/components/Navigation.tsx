import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();

    return(
        <nav className="top-0 left-0 w-full bg-blue-900 text-white p-4">
            {/* <ul className="flex flex-row gap-4 justify-center">
                <li><Link className={`p-3 rounded-lg ${location.pathname === '/' ? "bg-slate-400 text-blue-800" : "bg-blue-700"}`} to='/'>Home</Link></li>
                <li><Link className={`p-3 rounded-lg ${location.pathname === '/about' ? "bg-slate-400 text-blue-800" : "bg-blue-700"}`} to='/about'>About</Link></li>
                <li><Link className={`p-3 rounded-lg ${location.pathname === '/donate' ? "bg-slate-400 text-blue-800" : "bg-blue-700"}`} to='/donate'>Donate</Link></li>
            </ul> */}
            <h1 className="flex justify-around font-bold text-lg">DEEDL</h1>
        </nav>
    );
}
