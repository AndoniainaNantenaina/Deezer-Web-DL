export const SmNav = (props: {menuCallBack : () => void, profileCallBack: () => void}) => {
    return (
        <div className="flex flex-row justify-between sm:hidden px-2 py-3 bg-slate-50 text-slate-900">
            <button onClick={props.menuCallBack}>
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path>
                </svg>
            </button>
            <button>DeeDL</button>
            <button onClick={props.profileCallBack}>
                <img src={
                    JSON.parse(window.localStorage.getItem("user") as any)["image"]
                } alt="Avatar" className="rounded-full w-7 h-7" />
            </button>
        </div>
    );
}