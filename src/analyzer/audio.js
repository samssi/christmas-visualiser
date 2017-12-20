import * as R from "ramda";
import { setInterval } from "timers";

let prevTime = Date.now();
let bufferArray = [];
let arraySize = 0;
const arrayMax = 10;

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
           //console.log("l:" + bufferArray.length)
            const newTime = Date.now();
            const diff = newTime - prevTime;
            prevTime = Date.now();
            // multiply amount of relays received in a chunk with diff time to determine how long relay for corresponding led strip equalizer should be on
            console.log(dummyVisualise(bufferArray));
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
    /*R.forEach((averageFrequency) => {
        const relayType = returnRelayType(averageFrequency);
        relayType === undefined ? undefined : console.log(relayType);
    }, array);*/
    const uniqueSounds = R.uniq(R.map(returnRelayType, array));
    const nonNullUniqueSounds = R.reject(R.isNil, uniqueSounds);
    return nonNullUniqueSounds;
    //return returnRelayType(calculateAverageFromFrequencyData(array));
}

const returnRelayType = (averageFrequency) => {
    if (averageFrequency > 150) {
        return "boom";
    }
    else if (averageFrequency > 129 && averageFrequency < 140) {
        return "guitars";
    }
    else if (averageFrequency > 110 && averageFrequency < 121) {
        return "singing";
    }
    else {
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
