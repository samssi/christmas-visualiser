import * as R from "ramda";
import { setInterval } from "timers";

let prevTime = Date.now();
let bufferArray = [];
let arraySize = 0;
const arrayMax = 100;

const settings = {
    highThresholdMin: 180,
    midThresholdMin: 140,
    lowThresholdMin: 100,
    boomThresholdMin: 10,
}

export const render = () => {
    const audioContext = new AudioContext();
    const audio = document.getElementById("audio-field");
    const canvas = document.getElementById("canvas-field");
    const audioSrc = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 32;

    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const renderFrame = () => {
       requestAnimationFrame(renderFrame);
       analyser.getByteFrequencyData(frequencyData);
       const highRange = calculateAverageFromFrequencyData([frequencyData[1], frequencyData[2], frequencyData[3]]);
       const midRange = calculateAverageFromFrequencyData([frequencyData[4], frequencyData[5], frequencyData[6]]);
       const lowRange = calculateAverageFromFrequencyData([frequencyData[7], frequencyData[8], frequencyData[9]]);
       const boomRange = calculateAverageFromFrequencyData([frequencyData[13]]);
       //console.log(frequencyData[1], frequencyData[2], frequencyData[3]);
       console.log(relayPositions(highRange, midRange, lowRange, boomRange));
       //relayPositions(highRange, midRange, lowRange, boomRange)
    }
    audio.play();
    renderFrame();
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
