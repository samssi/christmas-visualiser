import * as R from "ramda";
import { setInterval } from "timers";

let prevTime = Date.now();
let bufferArray = [];
let arraySize = 0;
const arrayMax = 100;
/*const ignoreHighRange = [0];
const highRange = [1,2,3];
const midRange = [4,5,6];
const lowRange = [7,8,9];
const boomRange = [10,11,12];
const ignoreLow = [13,14,15];*/

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
       const highRange = calculateAverageFromFrequencyData([frequencyData[1,2,3]]);
       const midRange = calculateAverageFromFrequencyData([frequencyData[4,5,6]]);
       const lowRange = calculateAverageFromFrequencyData([frequencyData[7,8,9]]);
       const boomRange = calculateAverageFromFrequencyData([frequencyData[10,11,12]]);
       console.log([highRange, midRange, lowRange, boomRange]);
    }
    audio.play();
    renderFrame();
}

const buffer = (chunk) => {
    bufferArray = bufferArray.concat(chunk);
}

const returnRelayType = (averageFrequency) => {
    if (averageFrequency > 150) {
        return "low";
    }
    else if (averageFrequency > 108 && averageFrequency < 150) {
        return "mid";
    }
    else if (averageFrequency > 0 && averageFrequency < 500) {
        return "high";
    }
    else {
        console.log(averageFrequency);
        return undefined;
    }
}

const calculateAverageFromFrequencyData = (frequencyData) => {
    let sum = 0;
    for (let i = 0; i < frequencyData.length; i++) {
        sum = sum + frequencyData[i];
    }
    return Math.round(sum / frequencyData.length);
}
