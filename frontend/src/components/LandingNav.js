import {
    Anchor,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    Header,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconBook2,
    IconChevronDown,
    IconClipboardList,
    IconDiscountCheck,
    IconFolder,
    IconHomeHeart,
    IconPlane,
    IconSchool,
    IconShield,
} from "@tabler/icons";
import { useEffect, useRef, useState } from "react";

import { default as Logo } from "../assets/logo.svg";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const useStyles = createStyles((theme) => ({
    transparentColor: {
        backgroundColor: "transparent",
    },

    opaque: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },

    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: "white",
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
            color: "black",
        },

        ...theme.fn.hover({
            color: "rgba(255, 255, 255, 0.7)",
            textDecoration: "none",
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

const featuresdata = [
    {
        icon: IconShield,
        title: "Multi-factor authentication",
        description: "Secure vaults and account with 2FA",
        link: "/features",
    },
    {
        icon: IconDiscountCheck,
        title: "Password checking",
        description: "Ensure your passwords are hard to crack",
        link: "/features",
    },
    {
        icon: IconFolder,
        title: "Password grouping",
        description: "Organize your life into vaults and folders",
        link: "/features",
    },
    {
        icon: IconPlane,
        title: "Travel mode",
        description: "Hide your passwords when traveling abroad",
        link: "/features",
    },
];

const solutionsdata = [
    {
        icon: IconSchool,
        title: "Students",
        description: "Store your passwords for all your school resources",
        link: "/solutions",
    },
    {
        icon: IconBook2,
        title: "Teachers",
        description: "Leverage vaults for your classes and students",
        link: "/solutions",
    },
    {
        icon: IconClipboardList,
        title: "Clubs",
        description: "Save your organization's passwords with MFA",
        link: "/solutions",
    },
    {
        icon: IconHomeHeart,
        title: "Families",
        description: "Connect your smart home and shared accounts",
        link: "/solutions",
    },
];

export function LandingNav({pb=120}) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksFeaturesOpened, { toggle: toggleFeatures }] = useDisclosure(false);
    const [linksSolutionsOpened, { toggle: toggleSolutions }] = useDisclosure(false);
    const [loginModalOpened, { toggle: toggleLoginModal }] = useDisclosure(false);
    const [signupModalOpened, { toggle: toggleSignupModal }] = useDisclosure(false);
    // Save width and height of login/signup div to use on image
    const [groupSize, setGroupSize] = useState([0, 0]);
    const ref = useRef(null);

    useEffect(() => {
        setGroupSize([ref.current.clientWidth, ref.current.clientHeight]);
    }, []);
    const { classes, theme } = useStyles();

    const links = featuresdata.map((item) => (
        <UnstyledButton onClick={() => window.location.href=item.link} className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color="#5481CA" />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    const solutionslinks = solutionsdata.map((item) => (
        <UnstyledButton onClick={() => window.location.href=item.link} className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color="#5481CA" />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={pb}>
            <Header withBorder={false} height={60} px="md" className={classes.transparentColor}>
                <Group position="apart" sx={{ height: "100%" }}>
                    <Group 
                        onClick={() => window.location.href="/"}
                        sx={(theme) => ({
                            [theme.fn.largerThan("sm")]: {
                                width: groupSize[0],
                                height: groupSize[1],
                                paddingLeft: theme.spacing.sm,
                            },
                            cursor: "pointer",
                        })}
                    >
                        <img href="/" src={Logo} alt="pwdly logo" />
                    </Group>

                    <Group sx={{ height: "100%" }} spacing={0} className={classes.hiddenMobile}>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Anchor href="/features" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Features
                                        </Box>
                                        <IconChevronDown size={16} color="white" />
                                    </Center>
                                </Anchor>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <Group position="apart" px="md">
                                    <Text weight={500}>Features</Text>
                                </Group>

                                <Divider my="sm" mx="-md" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="/solutions" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Solutions
                                        </Box>
                                        <IconChevronDown size={16} color="white" />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <Group position="apart" px="md">
                                    <Text weight={500}>Solutions</Text>
                                </Group>

                                <Divider my="sm" mx="-md" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                                <SimpleGrid cols={2} spacing={0}>
                                    {solutionslinks}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <Anchor href="/about-us" className={classes.link}>
                            About Us
                        </Anchor>
                    </Group>

                    <Group ref={ref} className={classes.hiddenMobile}>
                        <Button
                            variant="white"
                            radius="xl"
                            color="gray.0"
                            onClick={toggleLoginModal}
                            className={classes.transparentColor}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="light"
                            radius="xl"
                            color="gray.0"
                            onClick={toggleSignupModal}
                            className={classes.opaque}
                        >
                            Sign up
                        </Button>
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                        color={theme.colors.gray[0]}
                    />
                </Group>
            </Header>

            {/*Hamburger menu for mobile*/}
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                    <UnstyledButton className={classes.link} onClick={toggleFeatures}>
                        <Center>
                            <Box
                                sx={(theme) => ({
                                    color: "black",
                                })}
                                component="span"
                                mr={5}
                            >
                                Features
                            </Box>
                            <IconChevronDown size={16} color="black" />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksFeaturesOpened}>{links}</Collapse>

                    <UnstyledButton className={classes.link} onClick={toggleSolutions}>
                        <Center inline>
                            <Box
                                sx={(theme) => ({
                                    color: "black",
                                })}
                                component="span"
                                mr={5}
                            >
                                Solutions
                            </Box>
                            <IconChevronDown size={16} color="black" />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksSolutionsOpened}>{solutionslinks}</Collapse>

                    <Anchor href="/" className={classes.link}>
                        About Us
                    </Anchor>

                    <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            variant="white"
                            radius="xl"
                            onClick={() => {
                                closeDrawer();
                                toggleLoginModal();
                            }}
                            className={classes.transparentColor}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="light"
                            radius="xl"
                            onClick={() => {
                                closeDrawer();
                                toggleSignupModal();
                            }}
                        >
                            Sign up
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
            <LoginModal opened={loginModalOpened} closed={toggleLoginModal} openSignupModal={toggleSignupModal} />
            <SignupModal opened={signupModalOpened} closed={toggleSignupModal} openLoginModal={toggleLoginModal} />
        </Box>
    );
}
