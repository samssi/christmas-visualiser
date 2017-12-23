import * as files from "../files/files"
import * as R from "ramda";
import * as audioPlayer from "../analyzer/audio";

const body = document.body;
const head = document.head;
const rootElement = document.getElementById("root");

const renderCss = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "/css/main.css";
    head.appendChild(link);
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

export const selectFile = () => {
    const audiofiles = document.getElementById("audiofiles");
    const audio = document.getElementById("audio-field");
    audioPlayer.analyse(audiofiles.value);   
}

export const selectFileOptions = () => {
    const audiofiles = document.getElementById("audiofiles");
    audiofiles.addEventListener("click", selectFile);
    R.forEach((file) => {
        const option = document.createElement("option");
        option.text = file.filename;
        option.value = file.filename;
        audiofiles.appendChild(option);
    }, files.allFiles);
}

selectFileOptions()