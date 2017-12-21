
import RPi.GPIO as GPIO
import time
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

relayIn1 = 3
relayIn2 = 5
relayIn3 = 7
relayIn4 = 11
relayIn5 = 13
relayIn6 = 15

def setup():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setwarnings(False)
        GPIO.setup(relayIn1, GPIO.OUT)
        GPIO.setup(relayIn2, GPIO.OUT)
        GPIO.setup(relayIn3, GPIO.OUT)
        GPIO.setup(relayIn4, GPIO.OUT)
        GPIO.setup(relayIn5, GPIO.OUT)
        GPIO.setup(relayIn6, GPIO.OUT)

def relay(status, relay):
        if (status == "off"):
                GPIO.output(relay, GPIO.LOW)
        elif (status == "on"):
                GPIO.output(relay, GPIO.HIGH)

setup()

@app.route('/api/relay', methods=['POST'])
def settings():
    request_json = request.get_json()
    high = request_json.get("high")
    mid = request_json.get("mid")
    low = request_json.get("low")
    bass = request_json.get("bass")
    boom = request_json.get("boom")

    # if boom then all
    # temp solution now
    relay(boom, relayIn1)
    return "done"