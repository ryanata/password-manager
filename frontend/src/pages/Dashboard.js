import { Anchor, AppShell, Center, Group, Header, Loader, Navbar, Text, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { DashboardLeftNav } from "../components/DashboardLeftNav"; 

import VaultTable from "../components/VaultTable";
import { VaultContext, useUser } from "../helpers/Hooks";

const useStyles = createStyles((theme) => ({}));

const initialVault = {
    name: "Personal",
    unlocked: false,
};

const VaultProvider = ({ children }) => {
    const [vault, setVault] = useState(initialVault);
    const value = useMemo(
        () => ({
            vault,
            setVault,
        }),
        [vault]
    );

    return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

const Dashboard = () => {
    const { classes, theme } = useStyles();
    // Hooks
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);
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

    const user = data.data;
    console.log(user);
    return (
        <VaultProvider>
            <AppShell
                padding="md"
                navbar={isTablet ? null : <DashboardLeftNav />}
                header={
                    <Header height={60} p="xs">
                        {
                            <Group position="apart">
                                <Text>{`Welcome ${user.name.firstName} ${user.name.lastName}!`}</Text>

                                <Anchor
                                    onClick={() => {
                                        localStorage.removeItem("pwdlyToken");
                                    }}
                                    href="/"
                                >
                                    Log out
                                </Anchor>
                            </Group>
                        }
                    </Header>
                }
                styles={(theme) => ({
                    main: {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                })}
            >
                <VaultTable />
            </AppShell>
        </VaultProvider>
    );
};

export default Dashboard;
