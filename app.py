# DATABASE CONNECTION
import MySQLdb
db = MySQLdb.connect("localhost", "admin", "admin", "smarthome")
curs=db.cursor()


from flask import Flask, render_template

app = Flask(__name__)

@app.route('/rooms')
def control():
	cur.execute("SELECT roomKey,roomName FROM smarthome.rooms")
	for row in cur.fetchall() :
		roomKey = str(row[0])
		roomName = str(row[1])
	return roomKey
	return roomName
	return render_template('control.html')

@app.route('/getRooms', methods=['GET'])
def getRoomList():
	return [{"room": "kitchen"}, {"room": "bedroom"}]

@app.route('/rooms/<selectedroom>')
def room(selectedroom):
	return render_template('room.html', selectedroom=room)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')