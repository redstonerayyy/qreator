#!/usr/bin/env python3

from flask import Flask, send_file, request
import tempfile
import os
import qrcode

CODE_FILE = os.path.join(tempfile.gettempdir(), "qrcode.png")

app = Flask(__name__)

@app.route("/post-qr", methods=["POST"])
def getqr():
	img = qrcode.make(request.json["data"])
	img.save(CODE_FILE)
	return send_file(CODE_FILE, mimetype="image/png")

@app.route('/')
def hello_world():
	return app.send_static_file("index.html")

if __name__ == "__main__":
	app.run()
