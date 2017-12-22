
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

def relay(status, relay):
        if (status == "off"):
                GPIO.output(relay, GPIO.LOW)
        elif (status == "on"):
                GPIO.output(relay, GPIO.HIGH)

setup()

relay("on", relayIn1)
time.sleep("2")
relay("on", relayIn2)
time.sleep("2")
relay("on", relayIn3)
time.sleep("2")
relay("on", relayIn4)
time.sleep("2")
relay("on", relayIn5)
time.sleep("2")
relay("on", relayIn6)
time.sleep("2")
relay("on", relayIn7)
time.sleep("2")
relay("on", relayIn8)
time.sleep("2")
relay("off", relayIn1)
time.sleep("2")
relay("off", relayIn2)
time.sleep("2")
relay("off", relayIn3)
time.sleep("2")
relay("off", relayIn4)
time.sleep("2")
relay("off", relayIn5)
time.sleep("2")
relay("off", relayIn6)
time.sleep("2")
relay("off", relayIn7)
time.sleep("2")
relay("off", relayIn8)