import * as R from "ramda";
import { setInterval } from "timers";
import { relayClient } from "./axios-client";
import { settings, freqAnalysisRanges } from "../ui/settings"

let prevTime = Date.now();

// https://developer.mozilla.org/fi/docs/Web/API/AnalyserNode

export const render = () => {
    const audioContext = new AudioContext();
    const audio = document.getElementById("audio-field");
    const canvas = document.getElementById("canvas-field");
    const audioSrc = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    const sampleRate = audioContext.sampleRate;

    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const renderFrame = () => {
       requestAnimationFrame(renderFrame);
       analyser.fftSize = settings.fftSize;
       analyser.minDecibels = freqAnalysisRanges.minDecibels;
       analyser.maxDecibels = freqAnalysisRanges.maxDecibels;
       analyser.smoothingTimeConstant = settings.smoothingTimeConstant;
       analyser.getByteFrequencyData(frequencyData);
       const currentTime = Date.now();
       if (currentTime - prevTime > settings.samplingTime) {
            const currentRelayPositions = pickSampleGeneric(frequencyData, sampleRate);
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
    for (let i = lowN; i < highN; i++) {
        if (frequencyData[i] >= dbRate) {
            return "on";
        }
    }
    return "off";
} 
/*
See: https://www.teachmeaudio.com/mixing/techniques/audio-spectrum/
General options:
    Sub-bass        20 to 60 Hz
    Bass            60 to 250 Hz
    Low midrange    250 to 500 Hz
    Midrange        500 Hz to 2 kHz
    Upper midrange	2 to 4 kHz
    Presence	    4 to 6 kHz
    Brilliance	    6 to 20 kHz
*/
const pickSampleGeneric = (frequencyData, sampleRate) => {
    //console.log(freqAnalysisRanges)
    console.log(freqAnalysisRanges.minDecibels + " " + freqAnalysisRanges.maxDecibels)
    const high = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.highMinHz, freqAnalysisRanges.highMaxHz, freqAnalysisRanges.highPeak);
    const mid = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.midMinHz, freqAnalysisRanges.midMaxHz, freqAnalysisRanges.midPeak);
    const low = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.lowMinHz, freqAnalysisRanges.lowMaxHz, freqAnalysisRanges.lowPeak);
    const bass = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.bassMinHz, freqAnalysisRanges.bassMaxHz, freqAnalysisRanges.bassPeak);
    const boom = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.boomMinHz, freqAnalysisRanges.boomMaxHz, freqAnalysisRanges.boomPeak);
    return relayPositions(high, mid, low, bass, boom);
}

const relayPositions = (high, mid, low, bass, boom) => {
    return {
        high: high,
        mid: mid,
        low: low,
        bass: bass,
        boom: boom
    }
}