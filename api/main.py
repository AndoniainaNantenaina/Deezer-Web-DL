from flask import Flask, request, jsonify
from pydeezer import Deezer
from pydeezer.constants import track_formats

app = Flask(__name__)

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
    except:
        return jsonify({
            "code": 401,
            "message": "Invalid ARL",
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
    except:
        return jsonify({
            "code": 401,
            "message": "Invalid ARL",
            "user" : None,
            "data": []
        })

@app.route("/<arl>/download/<id>/<path:dir>")
def download(arl: str, id: str, dir: str):
    try:
        deezer = Deezer(arl=arl)
        track = deezer.get_track(id)
        
        track["download"](dir, quality=track_formats.MP3_320)
                
        return jsonify({
            "code": 200,
            "message": "OK",
            "user" : deezer.user,
            "data": []
        })
    except:
        return jsonify({
            "code": 401,
            "message": "Invalid ARL",
            "user" : None,
            "data": []
        })
    
if __name__ == "__main__":
    app.run(debug=True)