import { Anchor, AppShell, Center, Group, Header, Loader, Navbar, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";

import VaultTable from "../components/VaultTable";
import { VaultContext } from "../contexts/VaultContext";

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
    // Get jwt token to authenticate
    let token = "none";
    try {
        token = JSON.parse(localStorage.getItem("pwdlyToken"));
    } catch (error) {
        console.log(error);
    }
    const { data, isLoading, error } = useQuery(["getUser"], () =>
        axios.get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
    );

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
    return (
        <VaultProvider>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 300 }} p="xs">
                        {/* Navbar content */}
                    </Navbar>
                }
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
