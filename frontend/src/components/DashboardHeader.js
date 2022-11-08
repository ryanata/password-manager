import React from 'react'

import { default as Logo } from "../assets/logo.svg";
import { Anchor, AppShell, Center, Group, Header, Loader, Navbar, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  return (
    <Header height={60} p="xs" color='steel-blue'>
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
    
  )
}
