import RPi.GPIO as GPIO
import time
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

RelayPin = 3

def setup():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setwarnings(False)
        GPIO.setup(RelayPin, GPIO.OUT)
        GPIO.output(RelayPin, GPIO.HIGH)

def relay(status):
        if (status == "off"):
                GPIO.output(RelayPin, GPIO.LOW)
        elif (status == "on"):
                GPIO.output(RelayPin, GPIO.HIGH)

setup()

@app.route('/api/relay', methods=['POST'])
def settings():
    request_json = request.get_json()
    high = request_json.get("high")
    mid = request_json.get("mid")
    low = request_json.get("low")
    boom = request_json.get("boom")

    relay(boom)
    return "done"
