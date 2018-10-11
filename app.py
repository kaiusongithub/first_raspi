# DATABASE CONNECTION
import MySQLdb
db = MySQLdb.connect("localhost", "admin", "admin", "smarthome")
cur=db.cursor()


from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/rooms')
def control():
	return render_template('control.html')

#JSON
@app.route('/getRooms', methods=['GET'])
def returnRooms():
	cur.execute("SELECT roomID, roomKey,roomName, divID FROM smarthome.rooms")
	results = cur.fetchall()
	rooms = []
	content = {}
	for result in results:
		content = {'id': result[0], 'key': result[1], 'name': result[2], 'divid': result[3]}
		rooms.append(content)
		content = {}
	return jsonify(rooms)

@app.route('/getDevices', methods=['GET'])
def returnDevices():
	cur.execute("SELECT deviceID, deviceKey, deviceName, roomID, enabled FROM smarthome.devices")
	results = cur.fetchall()
	devices = []
	content = {}
	for result in results:
		content = {'id': result[0], 'key': result[1], 'name': result[2], 'roomID': result[3], 'enabled': result[4]}
		devices.append(content)
		content = {}
	return jsonify(devices)

@app.route('/rooms/<selectedroom>')
def room(selectedroom):
	return render_template('room.html', selectedroom=room)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')