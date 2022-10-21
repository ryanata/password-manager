import { Gradient } from "../scripts/Gradient";
import { useEffect } from "react";
import { Global, css } from "@emotion/react";

const cssCanvas = css`
    #gradient-canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        // Get rid of height and unindent transform to make it slanted
        height: 100%;
        // transform-origin: 0 100%;
        // transform: skewY(-12deg);
        --gradient-color-1: #0fc8e5;
        --gradient-color-2: #0a29a8;
        --gradient-color-3: #192de5;
        --gradient-color-4: #8e26dd;
    }
`;

const Landing = () => {
    // Loads in gradient
    useEffect(() => {
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
    }, []);

    return (
        <div>
            <Global styles={cssCanvas} />
            <canvas id="gradient-canvas" data-transition-in />
        </div>
    );
};

export default Landing;
