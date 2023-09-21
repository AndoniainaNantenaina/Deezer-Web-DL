import os
from flask import Flask, jsonify, send_file, make_response, send_from_directory
from flask_cors import CORS
from pydeezer import Deezer
from pydeezer.constants import track_formats

app = Flask(__name__)
CORS(app, origins=[
    "https://deezer-dl.vercel.app",
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
    
    # dir = os.path.join(os.getcwd(), arl)
    
    # # Verify if user folder exists
    # if os.path.exists(dir) == True:
    #     # Delete user folder and all content
    #     for file in os.listdir(dir):
    #         os.remove(os.path.join(dir, file))
    #     os.rmdir(dir)
    
    try:
        deezer = Deezer(arl=arl)
        track = deezer.get_track(id)
        
        track["download"](os.path.join(os.getcwd(), arl), quality=track_formats.MP3_320)
          
        return send_file(
            os.path.join(
                os.getcwd(), 
                arl, 
                track["info"]["DATA"]["SNG_TITLE"], ".mp3"
            ), 
            as_attachment=True
        )
    
    except Exception as e:
        return jsonify({
            "code": 401,
            "message": e.__str__(),
            "user" : None,
            "data": []
        })
    
if __name__ == "__main__":
    app.run(debug=True)