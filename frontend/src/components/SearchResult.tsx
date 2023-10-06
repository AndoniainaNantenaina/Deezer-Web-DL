import { Album } from "../types/Album";
import { Artist } from "../types/Artist";
import { Playlist } from "../types/Playlist";
import { Track } from "../types/Track";

interface SearchResultProps {
    tracks : Track[];
    albums : Album[];
    artists : Artist[];
    playlists : Playlist[];
    dataType : string;
    loading : boolean;
}

function SearchResult(props : SearchResultProps) {
    
    if (props.loading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    if (props.dataType === 'track') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {
                    props.tracks.map((track : Track) => (
                        <div key={track.id}>
                            <h1>{track.artist.name}</h1>
                            <h2>{track.artist.name}</h2>
                            <h3>{track.album.title}</h3>
                        </div>
                    ))
                }
            </div>
        );
    }

    if (props.dataType === 'album') {
        return (
            <div>
                {
                    props.albums.map((album : Album) => (
                        <div key={album.id}>
                            <h1>{album.title}</h1>
                            <h2>{album.artist.name}</h2>
                        </div>
                    ))
                }
            </div>
        );
    }

    if (props.dataType === 'artist') {
        return (
            <div>
                <h1>Artists</h1>
            </div>
        );
    }

    if (props.dataType === 'playlist') {
        return (
            <div>
                <h1>Playlists</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Invalid type !</h1>
        </div>
    );

}

export default SearchResult;