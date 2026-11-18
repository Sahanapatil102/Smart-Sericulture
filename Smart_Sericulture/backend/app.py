from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample sensor data for testing
sensor_data = {
    "temperature": 27.5,
    "humidity": 75,
    "light": 650,
    "airflow": 2.5,
    "status": "Normal"
}


@app.route("/")
def home():
    return "Smart Sericulture Backend is Running!"


@app.route("/api/sensors")
def get_sensor_data():
    return jsonify(sensor_data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)