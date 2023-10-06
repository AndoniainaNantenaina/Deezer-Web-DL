// To parse this data:
//
//   import { Convert, Artist } from "./file";
//
//   const artist = Convert.toArtist(json);

export interface Artist {
    id:             number;
    link:           string;
    name:           string;
    nb_album:       number;
    nb_fan:         number;
    picture:        string;
    picture_big:    string;
    picture_medium: string;
    picture_small:  string;
    picture_xl:     string;
    radio:          boolean;
    tracklist:      string;
    type:           string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toArtist(json: string): Artist {
        return JSON.parse(json);
    }

    public static artistToJson(value: Artist): string {
        return JSON.stringify(value);
    }
}
