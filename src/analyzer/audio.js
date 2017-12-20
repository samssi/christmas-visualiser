import * as R from "ramda";
import { setInterval } from "timers";
import { relayClient } from "./axios-client";

let prevTime = Date.now();
const settings = {
    fftSize: 512,
    samplingTime: 20,
    highThresholdMin: 200,
    midThresholdMin: 200,
    lowThresholdMin: 200,
    boomThresholdMin: 250
    //boomThresholdMin: 230
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

const pickSample = (frequencyData, sampleRate) => {
    const highRange = frequencyData[frequencyPicker(settings.fftSize, sampleRate, 255)];
    const midRange = frequencyData[frequencyPicker(settings.fftSize, sampleRate, 750)];
    const lowRange = frequencyData[frequencyPicker(settings.fftSize, sampleRate, 800)];
    //125-128
    const boomRange = frequencyData[frequencyPicker(settings.fftSize, sampleRate, 125)];
    //console.log(relayPositions(highRange, midRange, lowRange, boomRange));
    return relayPositions(highRange, midRange, lowRange, boomRange)
}

const relayPositions = (high, mid, low, boom) => {
    return {
        high: visualize(high, settings.highThresholdMin),
        mid: visualize(mid, settings.midThresholdMin),
        low: visualize(low, settings.lowThresholdMin),
        boom: visualize(boom, settings.boomThresholdMin)
    }
}

const visualize = (frequency, minThreshold) => frequency > minThreshold ? "on" : "off";

const buffer = (chunk) => {
    bufferArray = bufferArray.concat(chunk);
}
