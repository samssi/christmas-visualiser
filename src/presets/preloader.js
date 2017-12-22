import * as R from "ramda";
import * as presets from "../presets/presets"
import { preload } from "../presets/presets";
import { freqAnalysisRanges } from "../ui/settings"

export const preloadOptions = () => {
    const preloadOptions = document.getElementById("presets");
    preloadOptions.addEventListener("click", loadPreset);
    R.forEach((preloaded) => {
        const option = document.createElement("option");
        option.text = preloaded.name;
        option.value = preloaded.name;
        preloadOptions.appendChild(option);
    }, presets.preload);
}

export const loadPreset = () => {
    const selected = document.getElementById("presets");
    const preload = R.find(R.propEq("name", selected.value))(presets.preload);

    document.getElementById("highMinHz").value = preload.highMinHz;
    freqAnalysisRanges.highMinHz = preload.highMinHz;

    document.getElementById("highMaxHz").value = preload.highMaxHz;
    freqAnalysisRanges.highMaxHz = preload.highMaxHz;

    document.getElementById("highPeak").value = preload.highPeak;
    freqAnalysisRanges.highPeak = preload.highPeak;

    document.getElementById("midMinHz").value = preload.midMinHz;
    freqAnalysisRanges.midMinHz = preload.midMinHz;

    document.getElementById("midMaxHz").value = preload.midMaxHz;
    freqAnalysisRanges.midMaxHz = preload.midMaxHz;

    document.getElementById("midPeak").value = preload.midPeak;
    freqAnalysisRanges.midPeak = preload.midPeak;

    document.getElementById("lowMinHz").value = preload.lowMinHz;
    freqAnalysisRanges.lowMinHz = preload.lowMinHz;

    document.getElementById("lowMaxHz").value = preload.lowMaxHz;
    freqAnalysisRanges.lowMaxHz = preload.lowMaxHz;

    document.getElementById("lowPeak").value = preload.lowPeak;
    freqAnalysisRanges.lowPeak = preload.lowPeak;

    document.getElementById("bassMinHz").value = preload.bassMinHz;
    freqAnalysisRanges.bassMinHz = preload.bassMinHz;

    document.getElementById("bassMaxHz").value = preload.bassMaxHz;
    freqAnalysisRanges.bassMaxHz = preload.bassMaxHz;

    document.getElementById("bassPeak").value = preload.bassPeak;
    freqAnalysisRanges.bassPeak = preload.bassPeak;

    document.getElementById("boomMinHz").value = preload.boomMinHz;
    freqAnalysisRanges.boomMinHz = preload.boomMinHz;

    document.getElementById("boomMaxHz").value = preload.boomMaxHz;
    freqAnalysisRanges.boomMaxHz = preload.boomMaxHz;

    document.getElementById("boomPeak").value = preload.boomPeak;
    freqAnalysisRanges.boomPeak = preload.boomPeak;

    document.getElementById("minDecibels").value = preload.minDecibels;
    freqAnalysisRanges.minDecibels = preload.minDecibels;

    document.getElementById("maxDecibels").value = preload.maxDecibels;
    freqAnalysisRanges.maxDecibels = preload.maxDecibels;
    
}

export const outputExportJson = () => {
    const jsonField = document.getElementById("jsonField");
    const exportName = document.getElementById("exportName");
    const withNameRanges = freqAnalysisRanges;
    withNameRanges.name = exportName.value;
    jsonField.innerHTML = JSON.stringify(freqAnalysisRanges, null, 2);
}

window.outputExportJson = outputExportJson;
window.loadPreset = loadPreset;