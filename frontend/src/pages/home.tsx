import Download from "../components/Download";

export default function Home() {
    return(
        <div className="bg-slate-900 text-white p-2 flex flex-col gap-2">
            <h1>Welcome to Deezer DL</h1>
            <Download />
        </div>
    );
}
