import * as pageRenderer from "./page-renderer/page-renderer";
import * as R from "ramda";
import * as audio from "./analyzer/audio";
import * as settings from "./ui/settings";

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(1, 1);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const canvas = createCanvas();