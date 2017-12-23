import * as R from "ramda";
import { setInterval } from "timers";
import { relayClient } from "./axios-client";
import { settings, freqAnalysisRanges } from "../ui/settings"

let prevTime = Date.now();
let file = "None";
let running = false;
let test = new Date();
let prevRelayPositions = "";
let packetLoss = 0
let packetSuccess = 0

const audioContext = new AudioContext();
const audio = document.getElementById("audio-field");
const audioSrc = audioContext.createMediaElementSource(audio);
const canvas = document.getElementById("canvas-field");
const analyser = audioContext.createAnalyser();
const sampleRate = audioContext.sampleRate;
// https://developer.mozilla.org/fi/docs/Web/API/AnalyserNode

export const analyse = (playFile) => {
    file = playFile;
    file !== "None" ? audio.src = "mp3/" + file : "";
    test = new Date();
    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    
    file !== "None" ? audio.play() : audio.pause();
    if (!running) {
        console.log("Starting analyzer");
        frame();
    }
}

const frame = () => {
    running = true;
    requestAnimationFrame(() => { renderFrame(analyser, renderFrame) });
}

const renderFrame = () => {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.fftSize = settings.fftSize;
    analyser.minDecibels = freqAnalysisRanges.minDecibels;
    analyser.maxDecibels = freqAnalysisRanges.maxDecibels;
    analyser.smoothingTimeConstant = settings.smoothingTimeConstant;
    analyser.getByteFrequencyData(frequencyData);
    const currentTime = Date.now();
    if (currentTime - prevTime > settings.samplingTime) {
        const currentRelayPositions = pickSampleGeneric(frequencyData, sampleRate);
        if (JSON.stringify(prevRelayPositions) !== JSON.stringify(currentRelayPositions)) {
            console.log("Sending")
            post(currentRelayPositions);
        }
        else {
            console.log("Same relay position - not sending");
        }
        prevRelayPositions = currentRelayPositions;
        
        prevTime = currentTime;
    }
    frame();
}

const post = (currentRelayPositions) => {
    relayClient.post("/api/relay", currentRelayPositions)
        .then((response) => {
            packetSuccess++;
            console.log("Packet success! Total: " + packetSuccess);
        })
        .catch((error) => {
            packetLoss++;
            console.log("Package lost! Total: " + packetLoss);
        }
        );
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
            return "1";
        }
    }
    return "0";
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
    const high = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.highMinHz, freqAnalysisRanges.highMaxHz, freqAnalysisRanges.highPeak);
    const mid = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.midMinHz, freqAnalysisRanges.midMaxHz, freqAnalysisRanges.midPeak);
    const low = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.lowMinHz, freqAnalysisRanges.lowMaxHz, freqAnalysisRanges.lowPeak);
    const bass = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.bassMinHz, freqAnalysisRanges.bassMaxHz, freqAnalysisRanges.bassPeak);
    const boom = gainDetector(frequencyData, sampleRate, freqAnalysisRanges.boomMinHz, freqAnalysisRanges.boomMaxHz, freqAnalysisRanges.boomPeak);
    return relayPositions(high, mid, low, bass, boom);
}

const relayPositions = (high, mid, low, bass, boom) => {
    return {
        h: high,
        m: mid,
        l: low,
        b: bass,
        o: boom
    }
}