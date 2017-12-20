import * as R from "ramda";
import { setInterval } from "timers";

let prevTime = Date.now();
const settings = {
    fftSize: 512,
    samplingTime: 500,
    highThresholdMin: 180,
    midThresholdMin: 180,
    lowThresholdMin: 180,
    boomThresholdMin: 120,
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
            console.log(frequencyPicker(settings.fftSize, sampleRate, 48000));
            pickSample(frequencyData);
            prevTime = currentTime;
       } 
    }
    audio.play();
    renderFrame();
}

const frequencyPicker = (fftSize, samplerate, hz) => {
    //the frequency bands are split equally, so each element N of your array corresponds to:
    //ArrayElement * samplerate/fftSize = Hz
    // (fftSize / sampleRate) * Hz = ArrayElement
    const n = (fftSize / samplerate) * hz;
    return Math.round(n);
}

const pickSample = (frequencyData) => {
    
    /*const highRange = frequencyData[frequencyPicker(200)];
    const midRange = frequencyData[frequencyPicker(200)];
    const lowRange = frequencyData[frequencyPicker(200)];
    const boomRange = frequencyData[frequencyPicker(200)];
    console.log(frequencyData);
    console.log(relayPositions(highRange, midRange, lowRange, boomRange));
    //relayPositions(highRange, midRange, lowRange, boomRange)*/
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

const calculateAverageFromFrequencyData = (frequencies) => {
    let sum = 0;
    for (let i = 0; i < frequencies.length; i++) {
        sum = sum + frequencies[i];
    }
    return Math.round(sum / frequencies.length);
}
