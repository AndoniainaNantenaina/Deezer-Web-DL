// To parse this data:
//
//   import { Convert, Playlist } from "./file";
//
//   const playlist = Convert.toPlaylist(json);

export interface Playlist {
    checksum:       string;
    creation_date:  Date;
    id:             number;
    link:           string;
    md5_image:      string;
    nb_tracks:      number;
    picture:        string;
    picture_big:    string;
    picture_medium: string;
    picture_small:  string;
    picture_type:   string;
    picture_xl:     string;
    public:         boolean;
    title:          string;
    tracklist:      string;
    type:           string;
    user:           User;
}

interface User {
    id:        number;
    name:      string;
    tracklist: string;
    type:      string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPlaylist(json: string): Playlist {
        return JSON.parse(json);
    }

    public static playlistToJson(value: Playlist): string {
        return JSON.stringify(value);
    }
}
