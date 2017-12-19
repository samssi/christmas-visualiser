import * as pageRenderer from "./page-renderer/page-renderer";
import * as R from "ramda";
import * as audio from "./analyzer/audio"

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(800, 600);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const canvas = createCanvas();
pageRenderer.renderAudio();

audio.render();
