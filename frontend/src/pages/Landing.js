import { Global, css } from "@emotion/react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef } from "react";

import { LandingNav } from "../components/LandingNav";
import { ProductDescription } from "../components/ProductDescription";
import { Gradient } from "../helpers/Gradient";

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
    const [loginModalOpened, { toggle: toggleLoginModal }] = useDisclosure(false);
    const [signupModalOpened, { toggle: toggleSignupModal }] = useDisclosure(false);

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
            <LandingNav
                loginModalOpened={loginModalOpened}
                signupModalOpened={signupModalOpened}
                toggleLoginModal={toggleLoginModal}
                toggleSignupModal={toggleSignupModal}
            />
            <ProductDescription
                loginModalOpened={loginModalOpened}
                signupModalOpened={signupModalOpened}
                toggleLoginModal={toggleLoginModal}
                toggleSignupModal={toggleSignupModal}
            />
        </div>
    );
};

export default Landing;
