import { Box } from "@mantine/core";
import { useEffect } from "react";

import { FeaturesDescription } from "../components/FeaturesDescription";
import { LandingNav } from "../components/LandingNav";

const Features = () => {
    // Sets page title
    useEffect(() => {
        document.title = "pwdly | Password Management Made Simple";
    }, []);

    return (
        <Box
            sx={(theme) => ({
                backgroundImage: theme.fn.gradient({ from: "#198EEA", to: "#09366E", deg: 45 }),
                height: "100vh",
            })}
        >
            <LandingNav pb={40} />
            <FeaturesDescription />
        </Box>
    );
};

export default Features;
