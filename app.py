# DATABASE CONNECTION
import MySQLdb
db = MySQLdb.connect("localhost", "admin", "admin", "smarthome")
cur=db.cursor()


from flask import Flask, render_template, jsonify, request

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

# Returns all the cities
@app.route('/getCities', methods=['GET'])
def returnCities():
	cur.execute("SELECT cityID, cityName, zipCode, country FROM smarthome.cities")
	results = cur.fetchall()
	cities = []
	content = {}
	for result in results:
		content = {'cityID': result[0], 'cityName': result[1], 'zipCode': result[2], 'country': result[3]}
		cities.append(content)
		content = {}
	return jsonify(cities)

# Add a new device
@app.route('/addDevice', methods=['POST'])
def addDevice():
	# ...
	request_json = request.get_json()
	deviceName = request_json.get('deviceName')
	deviceKey = request_json.get('deviceKey')
	roomID = request_json.get('roomID')
	enabled = request_json.get('enabled')
	cur.execute("INSERT INTO smarthome.devices (deviceKey, deviceName, roomID, enabled) VALUES (%s, %s, %s, %s)", (deviceKey, deviceName, roomID, enabled))
	return "success"

# Add a new city
@app.route('/addCity', methods=['POST'])
def addCity():
	# ...
	request_json = request.get_json()
	cityName = request_json.get('cityName')
	zipCode = request_json.get('zipCode')
	country = request_json.get('country')
	cur.execute("INSERT INTO smarthome.cities (cityName, zipCode, country) VALUES (%s, %s, %s)", (cityName, zipCode, country))
	return "success"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')