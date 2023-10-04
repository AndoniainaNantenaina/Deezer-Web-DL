export default function WrapText({ text, limit }: { text: string, limit: number }) {
    
    return (
        <div className="text-white">
            {
                text.length > limit ?
                    <div>
                        {text.slice(0, limit)}...
                    </div>
                    :
                    <div>
                        {text}
                    </div>
            }
        </div>
    );
}