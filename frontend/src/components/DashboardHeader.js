import { Anchor, Group, Header, Image, Space, Text, Title, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { default as Logo } from "../assets/logo.svg";
import AccountMenu from "../components/AccountMenu";

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
                    <Group position="apart" ta="center">
                        <Title
                            order={3}
                            weight={400}
                            transform="capitalize"
                        >{`${user.name.firstName} ${user.name.lastName[0]}`}</Title>
                        <Anchor>
                            <AccountMenu transition="skew-down" transitionDuration={300} transitionTimingFunction="ease"/>
                        </Anchor>
                        <Space h="md" />
                    </Group>
                </Group>
            }
        </Header>
    );
}
