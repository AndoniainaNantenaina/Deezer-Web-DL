import os
import threading
from zipfile import ZipFile
from flask import Flask, jsonify, send_file, make_response, send_from_directory
from flask_cors import CORS
from pydeezer import Deezer
from pydeezer.constants import track_formats

app = Flask(__name__)
CORS(app, origins=[
    "https://deezer-dl.vercel.app",
    "https://deedl-web.web.app",
    "http://localhost:3000",
])

@app.get("/<arl>/<type>/<id>")
def getDetailById(arl: str, type: str, id: str):
    """Fonction qui prend les details à l'aide d'un type de données et son ID.
    
    Keyword arguments:
    arl -- Le chaine de caractère contenant le token ARL de l'utilisateur depuis Deezer.
    type -- Le type de données à rechercher.
    id -- L'ID du données laquelle prendre les détails.
    Return: JSON -> Les résultats de recherche ou vide avec message d'erreur.
    """
    
    try:
        res = None
        deezer = Deezer(arl=arl)
        
        if type == "track":
            res = deezer.get_track(id)
            
        elif type == "album":
            res = deezer.get_album(id)
            
        elif type == "artist":
            res = deezer.get_artist(id)
            
        else:
            raise Exception("Invalid type")
        
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : deezer.user,
            "data": res["info"]["DATA"]
        })
        
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

@app.get("/<arl>/search/<type>/<query>")
def search(arl: str, type: str, query: str):
    """Fonction qui fait une recherche par rapport à un type de données (Musique, Album, Artist, Playlist).
    
    Keyword arguments:
    arl -- Le chaine de caractère contenant le token ARL de l'utilisateur depuis Deezer.
    type -- Le type de données à rechercher.
    query -- La requête à faire.
    Return: JSON -> Les résultats de recherche ou vide avec message d'erreur.
    """
    
    try:
        deezer = Deezer(arl=arl)
        
        res = []
    
        if type == "track":
            res = deezer.search_tracks(query)
        elif type == "album":
            res = deezer.search_albums(query)
        elif type == "artist":
            res = deezer.search_artists(query)
        elif type == "playlist":
            res = deezer.search_playlists(query)
        else:
            return jsonify({
                "code": 400,
                "message": "Invalid type",
                "user" : deezer.user,
                "data": []
            })
        
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : deezer.user,
            "data": res
        })
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.args[0],
            "user" : None,
            "data": []
        })
        
@app.route("/<arl>/user")
def get_user(arl: str):
    """Fonction pour prendre les informations de l'utilisateur à partir du token ARL depuis Deezer.
    
    Keyword arguments:
    arl -- Le chaine de caractère contenant le token ARL.
    Return: JSON -> avec les informations de l'utilisateur dans 'data' ou avec l'erreur.
    """
    
    try:
        deezer = Deezer(arl=arl)
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : deezer.user,
            "data": []
        })
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

@app.route('/<arl>/lyrics/<id>')
def get_lyrics(arl: str, id: str):
    try:
        deezer = Deezer(arl)
        
        lyrics_data = deezer.get_track_lyrics(id)
        
        deezer.save_lyrics(lyrics_data, os.path.join("/tmp", arl, id))
        
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : deezer.user,
            "data": lyrics_data.__str__()
        })
        
        # deezer.save_lyrics(lyrics_data, os.path.join("/tmp", arl, id))
        
        # return send_file(
        #     os.path.join("/tmp", arl, id + ".lrc"), 
        #     download_name=id + ".lrc",
        #     as_attachment=True
        # )
        
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

@app.route("/<arl>/download/<id>")
def download(arl: str, id: str):
    """Fontion de téléchargement.
    
    Keyword arguments:
    arl -- Un string qui spécifie le token ARL de l'utilisateur depuis Deezer.
    Return: Le fichier blob ou un JSON avec l'erreur.
    """
    
    dir = os.path.join("/tmp", arl)
    
    # Verify if user folder exists
    if os.path.exists(dir) == True:
        # Delete user folder and all content
        for file in os.listdir(dir):
            os.remove(os.path.join(dir, file))
        os.rmdir(dir)
    
    try:
        deezer = Deezer(arl=arl)
        track = deezer.get_track(id)
        
        track["download"](os.path.join("/tmp", arl), quality=track_formats.MP3_320)
        
        downloaded_track = os.path.join(
            "/tmp", arl, track["info"]["DATA"]["SNG_TITLE"] + ".mp3"
        )
        
        downloaded_lyrics = os.path.join(
            "/tmp", arl, track["info"]["DATA"]["SNG_TITLE"] + ".lrc"
        )
        
        if os.path.exists(downloaded_lyrics):
            
            zip_file = os.path.join("/tmp", arl, track["info"]["DATA"]["SNG_TITLE"] + ".zip")
            
            with ZipFile(zip_file, "w") as zip:
                with open(downloaded_lyrics, "rb") as f:
                    zip.writestr(track["info"]["DATA"]["SNG_TITLE"] + ".lrc", f.read())
                    f.close()
                
                with open(downloaded_track, "rb") as f:
                    zip.writestr(track["info"]["DATA"]["SNG_TITLE"] + ".mp3", f.read())
                    f.close()
                
                zip.close()
                
            return send_file(
                os.path.join("/tmp", arl, track["info"]["DATA"]["SNG_TITLE"] + ".zip"), 
                download_name=track["info"]["DATA"]["SNG_TITLE"] + ".zip",
                as_attachment=True
            )
        
        return send_file(
            os.path.join(
                "/tmp", 
                arl, 
                track["info"]["DATA"]["SNG_TITLE"] + ".mp3"
            ), 
            download_name=track["info"]["DATA"]["SNG_TITLE"] + ".mp3",
            as_attachment=True
        )
            
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

class DownloadThread(threading.Thread):
    
    def __init__(self, arl: str, track: dict[str, any]):
        self.arl = arl
        self.track = track
        super(DownloadThread, self).__init__()
        
    def run(self):
        """Fonction de lancement du thread de téléchargement de fichier sans prendre trop de temps à renvoyer la réponse de l'API
        Utilisé dans le cas ou il faut télécharger un fichier de grande taille alors que le temps de réponse devrait être minimum possible.
        
        Keyword arguments:
        self -- The object
        Return: None
        """
        
        # Check if user folder exists
        if os.path.exists(os.path.join("/tmp", self.arl)) == True:
            
            # Delete user folder and all content first 
            for file in os.listdir(os.path.join("/tmp", self.arl)):
                os.remove(os.path.join("/tmp", self.arl, file))
        
        self.track["download"](os.path.join("/tmp", self.arl), quality=track_formats.MP3_320)
        
        track_file = os.path.join("/tmp", self.arl, self.track["info"]["DATA"]["SNG_TITLE"] + ".mp3")
        bucket = storage.bucket()
        blob = bucket.blob(track_file)
        blob.upload_from_filename(track_file)
        
        blob.make_public()
        print(blob.public_url)

if __name__ == "__main__":
    app.run(debug=True)