import * as R from "ramda";

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
       const averageFrequency = calculateAverageFromFrequencyData(frequencyData);
        if (averageFrequency > 199) {
            console.log("boom!");
        }
        else if (averageFrequency > 170 && averageFrequency < 199) {
            console.log("blamo!");
        }
        /*
        else if (averageFrequency > 130 && averageFrequency < 140) {
            console.log("singing!");
        }
        */
        else if (averageFrequency > 60 && averageFrequency < 80) {
            console.log("strum!");
        }
        /*
        else if (averageFrequency > 100 && averageFrequency < 199) {
            console.log("blamo!");
        }
        else if (averageFrequency > 100 && averageFrequency < 199) {
            console.log("blamo!");
        }*/
       //R.forEach((element) => console.log(element), frequencyData);
    }
    audio.play();
    renderFrame();
}

const calculateAverageFromFrequencyData = (frequencyData) => {
    let sum = 0;
    for (let i = 0; i < frequencyData.length; i++) {
        sum = sum + frequencyData[i];
    }
    return Math.round(sum / frequencyData.length);
}
