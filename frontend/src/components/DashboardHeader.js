import React from "react";
import { default as iconUser } from "../assets/iconUser.png";
import { default as Logo } from "../assets/logo.svg";
import { Anchor, Group, Header, createStyles, Text, Space, Title, Image, Center } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    IconUserCircle
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: "#4681D0",
        color: theme.white,
        borderBottom: "0px",
    },
}));

export default function DashboardHeader() {
    let token = "none";
    try {
        token = JSON.parse(localStorage.getItem("pwdlyToken"));
    } catch (error) {
        console.log(error);
    }
    const { data, isLoading, error } = useQuery(["getUser"], () =>
        axios.get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
    );

    const user = data.data;
    const { classes } = useStyles();

    return (
        <Header height={60} p="xs" className={classes.header}>
            {
                <Group position="apart">
                    <Group>
                        <Space h="md" />
                        <img src={Logo} alt="pwdly logo" />
                    </Group>
                    <Group position="apart" align="center">
                        <Title order={3} transform="capitalize">
                            {`${user.name.firstName} ${user.name.lastName[0]}`}
                        </Title>
                        <Anchor
                            onClick={() => {
                                localStorage.removeItem("pwdlyToken");
                            }}
                            href="/"
                        >
                            <Center>
                                <IconUserCircle size={30} color="white"/>
                            </Center>
                        </Anchor>
                        <Space h="md" />
                    </Group>
                </Group>
            }
        </Header>
    );
}
