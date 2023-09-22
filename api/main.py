import os
import threading
from flask import Flask, jsonify, send_file, make_response, send_from_directory
from flask_cors import CORS
from pydeezer import Deezer
from pydeezer.constants import track_formats
from firebase_admin import credentials, initialize_app, storage

cred = credentials.Certificate({
    "type": "service_account",
    "project_id": "deezer-web-dl",
    "private_key_id": os.environ.get("PRIVATE_KEY_ID"),
    "private_key": os.environ.get("PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.environ.get("CLIENT_EMAIL"),
    "client_id": os.environ.get("CLIENT_ID"),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": os.environ.get("CLIENT_X509_CERT_URL")
})

initialize_app(cred, {
    'storageBucket': os.environ.get("STORAGE_BUCKET")
})

app = Flask(__name__)
CORS(app, origins=[
    "https://deezer-dl.vercel.app",
    "https://deedl-web.web.app",
    "http://localhost:3000",
])

@app.get("/<arl>/search/<type>/<query>")
def search(arl: str, type: str, query: str):
    
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
            "message": e.args[0],
            "user" : None,
            "data": []
        })

@app.route("/<arl>/download/<id>")
def download(arl: str, id: str):
    
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
        
        # # Lazy download
        # download = DownloadThread(arl, track)
        # download.start()
        # download.join()
        track["download"](os.path.join("/tmp", arl), quality=track_formats.MP3_320)
        
        return send_file(
            os.path.join(
                "/tmp", 
                arl, 
                track["info"]["DATA"]["SNG_TITLE"] + ".mp3"
            ), 
            download_name=track["info"]["DATA"]["SNG_TITLE"] + ".mp3",
            as_attachment=True
        )
        
        # return jsonify({
        #     "code": 200,
        #     "message": "OK",
        #     "user" : deezer.user,
        #     "data": [
        #         {
        #             "id": track["info"]["DATA"]["SNG_ID"],
        #             "title": track["info"]["DATA"]["SNG_TITLE"],
        #             "artist": track["info"]["DATA"]["ART_NAME"],
        #             "album": track["info"]["DATA"]["ALB_TITLE"],
        #             "cover": track["info"]["DATA"]["ALB_PICTURE"],
        #             "url": "https://deezer-web-dl.vercel.app/" + arl + "/save/" + track["info"]["DATA"]["SNG_TITLE"] + ".mp3"
        #         }
        #     ]
        # })
    
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

@app.route('/list/<arl>')
def get_saved_files(arl: str):
    """Get all downloaded files from user folder
    
    Keyword arguments:
    arl -- arl token from deezer
    Return: Return all files from user folder
    """
    try:
        files = []
        
        for file in os.listdir(os.path.join("/tmp", arl)):
            files.append({
                "name": file,
            })
            
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : arl,
            "data": files
        })
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })

@app.route('/<arl>/save/<name>')
def save_from_server_temp(arl: str, name: str):
    try:
        return send_file(
            os.path.join(
                "/tmp", 
                arl, 
                name
            ), 
            download_name=name,
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