from flask import Flask, render_template

app = Flask(__name__)

@app.route('/rooms')
def control():
	return render_template('control.html')

@app.route('/rooms/<selectedroom>')
def room(selectedroom):
	return render_template('room.html', selectedroom=room)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')