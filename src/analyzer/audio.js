import * as R from "ramda";
import { setInterval } from "timers";

let prevTime = Date.now();
let bufferArray = [];
let arraySize = 0;
const arrayMax = 4;

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
       //analyser.getByteFrequencyData(frequencyData);
       analyser.getByteTimeDomainData(frequencyData);

       //console.log(calculateAverageFromFrequencyData(frequencyData));
       //const averageFrequency = calculateAverageFromFrequencyData(frequencyData);
       if (bufferArray.length >= arrayMax) {
            const newTime = Date.now();
            const diff = newTime - prevTime;
            prevTime = Date.now();
            // multiply amount of relays received in a chunk with diff time to determine how long relay for corresponding led strip equalizer should be on
            dummyVisualise(bufferArray);
            bufferArray = [];
       }
       else {
            buffer(calculateAverageFromFrequencyData(frequencyData));
       }
       //R.forEach((element) => console.log(element), frequencyData);
    }
    audio.play();
    renderFrame();
}

const buffer = (chunk) => {
    bufferArray = bufferArray.concat(chunk);
}

const dummyVisualise = (array) => {
    R.forEach((averageFrequency) => {
        const relayType = returnRelayType(averageFrequency);
        relayType === undefined ? undefined : console.log(relayType);
    }, array);
}

const returnRelayType = (averageFrequency) => {
    if (averageFrequency > 199) {
        //console.log("boom!");
        return "boom"
    }
    else if (averageFrequency > 170 && averageFrequency < 199) {
        //console.log("blamo!");
        return "blamo";
    }
    else if (averageFrequency > 130 && averageFrequency < 140) {
        //console.log("singing!");
        return "singing";
    }
}

const calculateAverageFromFrequencyData = (frequencyData) => {
    let sum = 0;
    for (let i = 0; i < frequencyData.length; i++) {
        sum = sum + frequencyData[i];
    }
    return Math.round(sum / frequencyData.length);
}
