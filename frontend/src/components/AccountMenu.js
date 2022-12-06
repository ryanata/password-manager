import { Button, Group, Image, Menu, Space, Stack, Text } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
    let token = "none";
    try {
        token = JSON.parse(localStorage.getItem("pwdlyToken"));
    } catch (error) {
        console.log(error);
    }
    const { data, isLoading, error } = useQuery(["getUser"], () =>
        axios.get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
    );
    const navigate = useNavigate();
    const user = data.data;

    return (
        <Group position="center">
            <Menu
                shadow="md"
                width={250}
                radius="lg"
                position="bottom"
                offset={1}
                trigger="hover"
                styles={{ dropdown: { backgroundColor: "#454545" }, color: "#FFFFFF" }}
            >
                <Menu.Target>
                    <Button
                        radius="100%"
                        styles={(theme) => ({
                            root: {
                                backgroundColor: "#4681D0",
                                color: "white",
                                border: 0,
                                width: 50,
                                height: 50,
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingBottom: 5,

                                "&:hover": {
                                    backgroundColor: "#4681D0",
                                },
                            },
                        })}
                    >
                        <Avatar src={null} alt="no image here" color="blue" variant="light" radius="50%" size="md" />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Stack justify="space-around" align="center">
                        <Space h="xxs" />

                        <Avatar src={null} alt="no image here" color="blue" radius="50%" size="xl" />

                        <Stack align="center" spacing={0}>
                            <Text size="md" transform="capitalize" color={"white"}>
                                {`${user.name.firstName} ${user.name.lastName}`}
                            </Text>
                            <Text size="sm" color={"white"}>{`${user.email}`}</Text>
                        </Stack>

                        <Button
                            styles={(theme) => ({
                                root: {
                                    backgroundColor: "#454545",
                                    color: "white",
                                    width: "248px",
                                    borderBottom: "1px solid #3A3939",
                                    borderTop: "1px solid #3A3939",
                                    "&:hover": {
                                        backgroundColor: "#3A3939",
                                    },
                                },
                            })}
                            leftIcon={<IconSettings size={14} />}
                            onClick={() => navigate("/dashboard/settings")}
                        >
                            Account Settings
                        </Button>

                        <Button
                            onClick={() => {
                                localStorage.removeItem("pwdlyToken");
                                navigate("/");
                            }}
                        >
                            Log Out
                        </Button>
                        <Space h="xs" />
                    </Stack>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
};

export default AccountMenu;
