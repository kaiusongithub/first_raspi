from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/kaius')
def kaius():
    return 'Moin Kaius'

@app.route('/control')
def control():
	return render_template('control.html')

@app.route('/control/room/<room>')
def room(room):
	return render_template(room.html, room=room)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')