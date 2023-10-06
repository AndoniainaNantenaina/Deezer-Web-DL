// To parse this data:
//
//   import { Convert, Track } from "./file";
//
//   const track = Convert.toTrack(json);

export interface Track {
    album:                   Album;
    artist:                  Artist;
    duration:                number;
    explicit_content_cover:  number;
    explicit_content_lyrics: number;
    explicit_lyrics:         boolean;
    id:                      number;
    link:                    string;
    md5_image:               string;
    preview:                 string;
    rank:                    number;
    readable:                boolean;
    title:                   string;
    title_short:             string;
    title_version:           string;
    type:                    string;
}

interface Album {
    cover:        string;
    cover_big:    string;
    cover_medium: string;
    cover_small:  string;
    cover_xl:     string;
    id:           number;
    md5_image:    string;
    title:        string;
    tracklist:    string;
    type:         string;
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
    public static toTrack(json: string): Track {
        return JSON.parse(json);
    }

    public static trackToJson(value: Track): string {
        return JSON.stringify(value);
    }
}
