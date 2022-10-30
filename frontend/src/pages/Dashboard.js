import { useQuery } from "@tanstack/react-query";
import { Center, Loader, Text, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

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
            <h1>Dashboard</h1>
            <p>{"Welcome" + " " + user.name.firstName + " " + user.name.lastName}</p>
        </div>
    );
};

export default Dashboard;
