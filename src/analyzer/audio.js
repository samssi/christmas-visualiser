export const render = () => {
    const audioContext = new AudioContext();
    const audio = document.getElementById("audio-field");
    const audioSrc = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
    const renderFrame = () => {
       requestAnimationFrame(renderFrame);
       analyser.getByteFrequencyData(frequencyData);
       //console.log(frequencyData);
    }
    audio.play();
    renderFrame();
}
