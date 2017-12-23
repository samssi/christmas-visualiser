import * as preloader from "../presets/preloader"

export const settings = {
    fftSize: 1024,
    smoothingTimeConstant: 0.8,
    samplingTime: 150
}

export const freqAnalysisRanges = {
    minDecibels: -100,
    maxDecibels: -30,

    highMinHz: 6000, 
    highMaxHz: 20000,
    highPeak: 150,

    midMinHz: 500,
    midMaxHz: 2000,
    midPeak: 180,

    lowMinHz: 250,
    lowMaxHz: 500,
    lowPeak: 180,

    bassMinHz: 60,
    bassMaxHz: 250,
    bassPeak: 180,

    boomMinHz: 0,
    boomMaxHz: 2000,
    boomPeak: 255
}    

export const minDecibels = () => freqAnalysisRanges.minDecibels = document.getElementById("minDecibels").value;
export const maxDecibels = () => freqAnalysisRanges.maxDecibels = document.getElementById("maxDecibels").value;
export const samplingTime = () => settings.samplingTime = document.getElementById("samplingTime").value;
document.getElementById("minDecibels").value = freqAnalysisRanges.minDecibels;
document.getElementById("maxDecibels").value = freqAnalysisRanges.maxDecibels;
document.getElementById("samplingTime").value = settings.samplingTime;
window.minDecibels = minDecibels;
window.maxDecibels = maxDecibels;
window.samplingTime = samplingTime;

export const highMinHz = () => freqAnalysisRanges.highMinHz = document.getElementById("highMinHz").value;
export const highMaxHz = () => freqAnalysisRanges.highMaxHz = document.getElementById("highMaxHz").value;
export const highPeak = () => freqAnalysisRanges.highPeak = document.getElementById("highPeak").value;
document.getElementById("highMinHz").value = freqAnalysisRanges.highMinHz;
document.getElementById("highMaxHz").value = freqAnalysisRanges.highMaxHz;
document.getElementById("highPeak").value = freqAnalysisRanges.highPeak;
window.highMinHz = highMinHz;
window.highMaxHz = highMaxHz;
window.highPeak = highPeak;

export const midMinHz = () => freqAnalysisRanges.midMinHz = document.getElementById("midMinHz").value;
export const midMaxHz = () => freqAnalysisRanges.midMaxHz = document.getElementById("midMaxHz").value;
export const midPeak = () => freqAnalysisRanges.midPeak = document.getElementById("midPeak").value;
document.getElementById("midMinHz").value = freqAnalysisRanges.midMinHz;
document.getElementById("midMaxHz").value = freqAnalysisRanges.midMaxHz;
document.getElementById("midPeak").value = freqAnalysisRanges.midPeak;
window.midMinHz = midMinHz;
window.midMaxHz = midMaxHz;
window.midPeak = midPeak;

export const lowMinHz = () => freqAnalysisRanges.lowMinHz = document.getElementById("lowMinHz").value;
export const lowMaxHz = () => freqAnalysisRanges.lowMaxHz = document.getElementById("lowMaxHz").value;
export const lowPeak = () => freqAnalysisRanges.lowPeak = document.getElementById("lowPeak").value;
document.getElementById("lowMinHz").value = freqAnalysisRanges.lowMinHz;
document.getElementById("lowMaxHz").value = freqAnalysisRanges.lowMaxHz;
document.getElementById("lowPeak").value = freqAnalysisRanges.lowPeak;
window.lowMinHz = lowMinHz;
window.lowMaxHz = lowMaxHz;
window.lowPeak = lowPeak;

export const bassMinHz = () => freqAnalysisRanges.bassMinHz = document.getElementById("bassMinHz").value;
export const bassMaxHz = () => freqAnalysisRanges.bassMaxHz = document.getElementById("bassMaxHz").value;
export const bassPeak = () => freqAnalysisRanges.bassPeak = document.getElementById("bassPeak").value;
document.getElementById("bassMinHz").value = freqAnalysisRanges.bassMinHz;
document.getElementById("bassMaxHz").value = freqAnalysisRanges.bassMaxHz;
document.getElementById("bassPeak").value = freqAnalysisRanges.bassPeak;
window.bassMinHz = bassMinHz;
window.bassMaxHz = bassMaxHz;
window.bassPeak = bassPeak;

export const boomMinHz = () => freqAnalysisRanges.boomMinHz = document.getElementById("boomMinHz").value;
export const boomMaxHz = () => freqAnalysisRanges.boomMaxHz = document.getElementById("boomMaxHz").value;
export const boomPeak = () => freqAnalysisRanges.boomPeak = document.getElementById("boomPeak").value;
document.getElementById("boomMinHz").value = freqAnalysisRanges.boomMinHz;
document.getElementById("boomMaxHz").value = freqAnalysisRanges.boomMaxHz;
document.getElementById("boomPeak").value = freqAnalysisRanges.boomPeak;
window.boomMinHz = boomMinHz;
window.boomMaxHz = boomMaxHz;
window.boomPeak = boomPeak;

preloader.preloadOptions();