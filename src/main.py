from flask import Flask, send_file, request
import qrcode

app = Flask(__name__)

@app.route("/post-qr", methods=["POST"])
def getqr():
	img = qrcode.make(request.json["data"])
	img.save("code.png")
	return send_file("code.png", mimetype='image/png')

@app.route('/')
def hello_world():
	return app.send_static_file('index.html')

if __name__ == "__main__":
	app.run()