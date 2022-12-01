import { Box } from "@mantine/core";
import { useEffect } from "react";

import AboutUsContent from "../components/AboutUsContent";
import { LandingNav } from "../components/LandingNav";

const AboutUs = () => {
    // Sets page title
    useEffect(() => {
        document.title = "pwdly | Password Management Made Simple";
    }, []);

    return (
        <Box
            sx={(theme) => ({
                backgroundImage: theme.fn.gradient({ from: "#198EEA", to: "#09366E", deg: 45 }),
                height: "100%",
            })}
        >
            <LandingNav pb={40} />
            <AboutUsContent />
        </Box>
    );
};

export default AboutUs;
