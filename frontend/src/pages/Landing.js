import { Gradient } from "../scripts/Gradient";
import { useEffect, useRef } from "react";
import { Global, css } from "@emotion/react";
import { LandingNav } from "../components/LandingNav";

const cssCanvas = css`
    #gradient-canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        // transform-origin: 0 100%;
        // transform: skewY(-12deg);
        --gradient-color-1: #04234d; //#2096F3;
        --gradient-color-2: #0b4da7; //#390DA1;
        --gradient-color-3: #073473; //#0D47A0;
        --gradient-color-4: #1993f0; //#64B5F5;
    }
`;

const Landing = () => {
    const canvasRef = useRef(null);

    // Loads in gradient
    useEffect(() => {
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
        // Set gradient height to maximum window height
        gradient.height = window.screen.height;
        canvasRef.current.addEventListener("webglcontextlost", (e) => {
            // Reload page if WebGL crashes
            window.location.reload();
        });
    }, []);

    // Sets page title
    useEffect(() => {
        document.title = "pwdly | Password Management Made Simple";
    }, []);

    return (
        <div>
            <Global styles={cssCanvas} />
            <canvas id="gradient-canvas" ref={canvasRef} data-transition-in />
            <LandingNav />
        </div>
    );
};

export default Landing;
