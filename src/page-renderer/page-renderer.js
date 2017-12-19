const body = document.body;
const head = document.head;
const rootElement = document.getElementById("root");

const renderCss = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "/css/reset.css";
    head.appendChild(link);
}

export const renderAudio = () => {
    const audio = document.createElement("audio");
    audio.id = "audio-field"
    audio.src = "/mp3/sample.mp3";
    body.appendChild(audio);
}

export const fixedCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-field";
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export const initCanvas = (canvas) => {
    console.log("Starting Christmas Visualizer")
    body.style.backgroundColor = "white";
    renderCss();
    rootElement.appendChild(canvas);
}

