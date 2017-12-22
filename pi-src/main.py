import RPi.GPIO as GPIO
import time
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

relayIn1 = 31
relayIn2 = 33
relayIn3 = 35
relayIn4 = 37
relayIn5 = 32
relayIn6 = 36
relayIn7 = 38
relayIn8 = 40

def setup():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setwarnings(False)
        GPIO.setup(relayIn1, GPIO.OUT)
        GPIO.setup(relayIn2, GPIO.OUT)
        GPIO.setup(relayIn3, GPIO.OUT)
        GPIO.setup(relayIn4, GPIO.OUT)
        GPIO.setup(relayIn5, GPIO.OUT)
        GPIO.setup(relayIn6, GPIO.OUT)
        GPIO.setup(relayIn7, GPIO.OUT)
        GPIO.setup(relayIn8, GPIO.OUT)

def bassRelays(status):
        changeState(relayIn1, status)
        changeState(relayIn2, status)

def lowRelays(status):
        changeState(relayIn3, status)
        changeState(relayIn4, status)

def midRelays(status):
        changeState(relayIn5, status)
        changeState(relayIn6, status)

def highRelays(status):
        changeState(relayIn7, status)
        changeState(relayIn8, status)

def allRelays(status):
        changeState(relayIn1, status)
        changeState(relayIn2, status)
        changeState(relayIn3, status)
        changeState(relayIn4, status)
        changeState(relayIn5, status)
        changeState(relayIn6, status)
        changeState(relayIn7, status)
        changeState(relayIn8, status)

def changeState(relay, status):
        if (status == "on"):
                GPIO.output(relay, GPIO.LOW)
        elif (status == "off"):
                GPIO.output(relay, GPIO.HIGH)


setup()
allRelays("on")

@app.route('/api/relay', methods=['POST'])
def settings():
    request_json = request.get_json()
    high = request_json.get("high")
    mid = request_json.get("mid")
    low = request_json.get("low")
    bass = request_json.get("bass")
    boom = request_json.get("boom")

    if (boom == "on"):
        allRelays(boom)
    else:
        bassRelays(bass)
        lowRelays(low)
        midRelays(mid)
        highRelays(high)
    return "done"
