import { Anchor, AppShell, Center, Group, Header, Loader, Navbar, Text, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AllPasswords from "../components/AllPasswords";
import DashboardHeader from "../components/DashboardHeader";
import { DashboardLeftNav } from "../components/DashboardLeftNav";
import PasswordGenerator from "../components/PasswordGenerator";
import Settings from "../components/Settings.js";
import Vault from "../components/Vault";
import WelcomeModal from "../components/WelcomeModal";
import { VaultContext, useUser } from "../helpers/Hooks";

const useStyles = createStyles((theme) => ({}));

const LoadingVaults = ({ vaults }) => {
    // Redirect to the first vault
    const firstVault = vaults[0];
    if (firstVault) {
        window.location.href = `/dashboard/${firstVault}`;
    }
    return <>Welcome to pwdly! Create a vault to begin😄</>;
};

const VaultProvider = ({ vaultIds, children }) => {
    // Go through all vaults Ids and create an object like this:
    // {
    //     "vaultId1": {
    //         "unlocked": false,
    //      }
    // }
    const intialVault = vaultIds.reduce((acc, vaultId) => {
        acc[vaultId] = {
            unlocked: false,
        };
        return acc;
    }, {});
    const [vaultStates, setVaultStates] = useState(intialVault);
    const value = useMemo(
        () => ({
            vaultStates,
            setVaultStates,
        }),
        [vaultStates]
    );

    return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

const Dashboard = () => {
    const { classes, theme } = useStyles();
    // Hooks
    const { data, isLoading, error } = useUser();
    if (isLoading) {
        return (
            <Center style={{ width: "100%", height: "100vh" }}>
                <Loader size="xl" color="steel-blue" />
            </Center>
        );
    }

    // Kick them out if invalid jwt
    if (error) {
        return (
            <Center style={{ width: "100%", height: "100vh" }}>
                <Text>
                    Your session has expired. Please log in on our
                    <Anchor href="/"> home page.</Anchor>
                </Text>
            </Center>
        );
    }

    const vaults = data.data.vaults;
    // If they have no vaults, open a welcome modal
    const noVaults = vaults.length === 0;
    const userId = data.data._id;
    return (
        <VaultProvider vaultIds={vaults}>
            <AppShell
                padding="md"
                navbar={<DashboardLeftNav />}
                header={<DashboardHeader />}
                styles={(theme) => ({
                    main: {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                })}
            >
                {noVaults && <WelcomeModal userId={userId} />}
                <Routes>
                    <Route exact path="/" element={<LoadingVaults vaults={vaults} />} />
                    <Route path=":id" element={<Vault />} />
                    <Route path="all-passwords" element={<AllPasswords />} />
                    <Route path="password-generator" element={<PasswordGenerator />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </AppShell>
        </VaultProvider>
    );
};

export default Dashboard;
