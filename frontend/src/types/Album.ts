// To parse this data:
//
//   import { Convert, Album } from "./file";
//
//   const album = Convert.toAlbum(json);

export interface Album {
    artist:          Artist;
    cover:           string;
    cover_big:       string;
    cover_medium:    string;
    cover_small:     string;
    cover_xl:        string;
    explicit_lyrics: boolean;
    genre_id:        number;
    id:              number;
    link:            string;
    md5_image:       string;
    nb_tracks:       number;
    record_type:     string;
    title:           string;
    tracklist:       string;
    type:            string;
}

interface Artist {
    id:             number;
    link:           string;
    name:           string;
    picture:        string;
    picture_big:    string;
    picture_medium: string;
    picture_small:  string;
    picture_xl:     string;
    tracklist:      string;
    type:           string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAlbum(json: string): Album {
        return JSON.parse(json);
    }

    public static albumToJson(value: Album): string {
        return JSON.stringify(value);
    }
}
