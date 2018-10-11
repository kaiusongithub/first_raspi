# DATABASE CONNECTION
import MySQLdb
db = MySQLdb.connect("localhost", "admin", "admin", "smarthome")
cur=db.cursor()


from flask import Flask, render_template, jsonify

app = Flask(__name__)


# Serving templates
@app.route('/rooms')
def control():
	return render_template('control.html')

@app.route('/rooms/<selectedroom>')
def room(selectedroom):
	return render_template('room.html', selectedroom=room)

@app.route('/admin')
def admin():
	return render_template('admin.html')

# DB Services
# Returns all the rooms
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

# Returns all the devices
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

# Adds a new Device to the DB
@app.route('/addDevice', methods=['GET'])
def returnDevices():


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')