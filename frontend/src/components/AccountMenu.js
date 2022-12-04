import { Group, Button, Text, Image, Stack, Space, Menu, createStyles } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconSettings } from "@tabler/icons";
import { Avatar } from '@mantine/core';
import { default as iconUser } from "../assets/iconUser.png";

const useStyles = createStyles((theme) => ({

      backgroundColor: "#4681D0",
      color: theme.white,
      borderBottom: "0px",
  
}));

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

    const user = data.data;
    const { classes } = useStyles();
  return (
    <Group position="center">
      <Menu shadow="md" width={300} position='bottom-end' trigger="hover" classNames={classes}>
      <Menu.Target>
        <Button
        radius='100%'
        styles={(theme) => ({
          root: {
            backgroundColor: '#4681D0',
            color: 'white',
            border: 0,
            width: 50,
            height: 50,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 5,
          
            '&:hover': {
              backgroundColor: '#4681D0',
            },
          }})}>
            <Avatar src={null} alt="no image here" radius="50%" size='md'/>
        </Button>
      </Menu.Target>

      <Menu.Dropdown color='#000000'>
          <Stack justify='space-around' align='center' >
            <Space h="xxs" />

            <Avatar src={null} alt="no image here" radius="50%" size='xl'/>

            <Stack align="center" spacing={0}>
                <Text transform="capitalize">{`${user.name.firstName} ${user.name.lastName}`}</Text>
                <Text fz="lg">{`${user.email}`}</Text>
            </Stack>

            <Button  
              styles={(theme) => ({
                root: {
                  color: theme.colorScheme === "dark" ? theme.white : theme.black,
                  backgroundColor: '#454545',
                  color: 'white',
                  width: '100%',
                  borderBottom: "1px solid #3A3939",
                  borderTop: "1px solid #3A3939",
                  '&:hover': {
                    backgroundColor: '#3A3939',
                    // borderBottom: "1px solid #3A3939" "/dashboard/settings",
                  },

                }})}
              leftIcon={<IconSettings size={14} />}>
                Account Settings
              </Button>
              
              <Button  onClick={() => {
                                localStorage.removeItem("pwdlyToken");
                            }}
                            href="/"
                >Log Out</Button>
              <Space h="xxs" />
          </Stack>
      </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default AccountMenu;