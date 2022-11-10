import React from "react";
import { IconUser } from "@tabler/icons";
import { default as Logo } from "../assets/logo.svg";
import { Anchor, Group, Header, createStyles, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// FIX color 4681D0 & padding, 
const useStyles = createStyles((theme) => ({
    header: {
        // padding: theme.spacing.md,
        // paddingTop: 0,
        // marginLeft: -theme.spacing.xs,
        // paddingLeft: theme.spacing.lg,
        // marginRight: -theme.spacing.md,
        backgroundColor: theme.colors.blue[5],
        color: theme.white,
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

// Add "account" button with icon and redirect

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
                    <img src={Logo} alt="pwdly logo" />
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
                </Group>
            }
        </Header>
    );
}
