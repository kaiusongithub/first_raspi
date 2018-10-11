# DATABASE CONNECTION
import MySQLdb
db = MySQLdb.connect("localhost", "admin", "admin", "smarthome")
cur=db.cursor()


from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/rooms')
def control():
	cur.execute("SELECT roomKey,roomName FROM smarthome.rooms")
	results = cur.fetchall()
	rooms = []
	content = {}
	for result in results:
		content = {'key': result[0], 'name': result[1]}
		rooms.append(content)
		content = {}
	return render_template('control.html', rooms=jsonify(rooms))

@app.route('/getRooms', methods=['GET'])
def getRoomList():
	return [{"room": "kitchen"}, {"room": "bedroom"}]

@app.route('/rooms/<selectedroom>')
def room(selectedroom):
	return render_template('room.html', selectedroom=room)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')