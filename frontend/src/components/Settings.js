import { Text, Paper, Box, Grid, Avatar, Stack, Button, Container, Group, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from "@tanstack/react-query";
import EditAccountModal from './EditAccountModal';
import EditPasswordModal from './EditPasswordModal';
import axios from "axios";
import { IconSun, IconMoonStars } from '@tabler/icons';


const Settings = () => {
    // Hooks
    const [editAccountModalOpened, { toggle: toggleEditAccountModal }] = useDisclosure(false);
    const [editPasswordModalOpened, { toggle: toggleEditPasswordModal }] = useDisclosure(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    // Helpers
    const queryClient = new useQueryClient();
    const user = queryClient.getQueryData(["getUser"]).data;
    console.log(user);
    // Format user.phone to string to (xxx) xxx-xxxx
    const phone = user.phone.toString();
    const formattedPhone = phone ? `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6, 10)}` : "";

    const toggleTwoFactorAuth = () => {
        axios.put(`/api/user/${user._id}/update`, { twoFactorAuthEnabled: !user.twoFactorAuthEnabled })
            .then((res) => {
                queryClient.invalidateQueries(["getUser"]);
            })
            .catch((err) => {
                console.log(err);
            });      
    };


    return (
        <Container size="sm">
            <Text py="sm" size="xl" align='left'>My Account</Text>
            <Paper p="lg" withBorder radius="md">
            <Grid grow>
                <Grid.Col align='center' span={1}>
                    <Avatar src={null} radius="100px" size="60px" alt="Default Image" />
                </Grid.Col>
                <Grid.Col span={3}  pt="md">
                    <Stack align="flex-start" spacing="5">
                        <Text size="xs" color={dark ? 'gray.5' : 'gray'}>NAME</Text>
                        <Text pb="lg" transform="capitalize">{`${user.name.firstName} ${user.name.lastName}`}</Text>
                        <Text size="xs" color={dark ? 'gray.5' : 'gray'}>EMAIL</Text>
                        <Text pb="lg" transform="lowercase">{`${user.email}`}</Text>
                        <Text size="xs" color={dark ? 'gray.5' : 'gray'}>PHONE NUMBER</Text>
                        <Text pb="lg">{formattedPhone}</Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col align="right" span={3} offset={3}>
                    <Button fullWidth onClick={toggleEditAccountModal} >Edit Profile</Button>
                </Grid.Col>
            </Grid>
            </Paper>
            <Text py="lg" size="xl" align="left">Password and Authentication</Text>
            <Group position="left">
                <Button onClick={toggleEditPasswordModal}>Change Password</Button>
            </Group>
            <Text pt="lg" size="xl" align="left">Password and Authentication</Text>
            <Text size="xs" color={dark ? 'gray.5' : 'gray'} align="left" pb="lg">Add an extra layer of security 
            to your account by configuring  Two-Factor Authentication.
            Once configured, you will be required to enter both your password and an authentication
            code from your mobile phone in order sign in.</Text>
            <Group position="left">
                <Button color={user.twoFactorAuthEnabled && "red"} onClick={toggleTwoFactorAuth}>{user.twoFactorAuthEnabled ? "Disable Two-Factor Auth" : "Enable Two-Factor Auth"}</Button>
            </Group>
            {editAccountModalOpened && <EditAccountModal opened={editAccountModalOpened} closed={toggleEditAccountModal} user={user} />}
            {editPasswordModalOpened && <EditPasswordModal opened={editPasswordModalOpened} closed={toggleEditPasswordModal} user={user} />}
            <Text pt="lg" pb="xs" size="xl" align="left">Theme</Text>
            <ActionIcon
                variant="light"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                size={35}
                >
                {dark ? <IconSun size={22} /> : <IconMoonStars size={22} />}
            </ActionIcon>
        </Container>
    );
}

export default Settings;