import * as R from "ramda";
import { setInterval } from "timers";
import { relayClient } from "./axios-client";

let prevTime = Date.now();
const settings = {
    fftSize: 1024,
    samplingTime: 80
}

export const render = () => {
    const audioContext = new AudioContext();
    const audio = document.getElementById("audio-field");
    const canvas = document.getElementById("canvas-field");
    const audioSrc = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    const sampleRate = audioContext.sampleRate;
    console.log(sampleRate);
    analyser.fftSize = settings.fftSize;

    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const renderFrame = () => {
       requestAnimationFrame(renderFrame);
       analyser.getByteFrequencyData(frequencyData);
       const currentTime = Date.now();
       if (currentTime - prevTime > settings.samplingTime) {
            const currentRelayPositions = pickSample(frequencyData, sampleRate);
            post(currentRelayPositions);
            console.log(currentRelayPositions);
            prevTime = currentTime;
       } 
    }
    audio.play();
    renderFrame();
}

const post = (currentRelayPositions) => {
    relayClient.post("/api/relay", currentRelayPositions)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

const frequencyPicker = (fftSize, samplerate, hz) => {
    //the frequency bands are split equally, so each element N of your array corresponds to:
    //ArrayElement * samplerate/fftSize = Hz
    // (fftSize / sampleRate) * Hz = ArrayElement
    const n = (fftSize / samplerate) * hz;
    return Math.round(n);
}

const gainDetector = (frequencyData, sampleRate, low, high, dbRate) => {
    const lowN = frequencyPicker(settings.fftSize, sampleRate, low);
    const highN = frequencyPicker(settings.fftSize, sampleRate, high);
    //200-350
    for (let i = lowN; i < highN; i++) {
        if (frequencyData[i] >= dbRate) {
            return "on";
        }
    }
    return "off";
} 

const pickSample = (frequencyData, sampleRate) => {
    // supporting singers -- AC/DC great!
    const onOff = gainDetector(frequencyData, sampleRate, 930, 1400, 200);

    // lead singer -- AC/DC great!
    //const onOff = gainDetector(frequencyData, sampleRate, 366, 580, 210);
    
    // Guitars -- AC/DC great!
    //const onOff = gainDetector(frequencyData, sampleRate, 280, 486, 173);
    
    // Bass -- AC/DC great!
    //const onOff = gainDetector(frequencyData, sampleRate, 21, 107, 243);

    // Boom -- AC/DC good
    //const onOff = gainDetector(frequencyData, sampleRate, 0, 2000, 255);

    return relayPositions(onOff);
}

const relayPositions = (boom) => {
    return {
        high: "off",
        mid: "off",
        low: "off",
        boom: boom
    }
}

const visualize = (frequency, minThreshold) => frequency > minThreshold ? "on" : "off";
