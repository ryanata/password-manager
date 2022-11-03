import { useQuery } from "@tanstack/react-query";
import { AppShell, Center, Loader, Group, Navbar, Header, Text, Anchor } from "@mantine/core";
import axios from "axios";
import VaultTable from "../components/VaultTable";

const Dashboard = () => {
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
        <div>
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
        </div>
    );
};

export default Dashboard;
