import { Code, Group, Navbar, ScrollArea, createStyles } from "@mantine/core";
import {
    IconGauge,
    IconLock,
    IconSettings,
    IconShieldLock,
    IconUser,
} from "@tabler/icons";

import { LinksGroup } from "./NavbarLinksGroups";
import { UserButton } from "./UserButton";
import { default as Logo } from "../assets/logo.svg";

const mockdata = [
    { label: "Dashboard", icon: IconGauge },
    {
        label: "Vaults",
        icon: IconShieldLock,
        initiallyOpened: true,
        links: [
            { label: "Personal", link: "/" },
            { label: "School", link: "/" },
            { label: "Club", link: "/" },
            { label: "Job", link: "/" },
        ],
    },
    { label: "Password Generator", icon: IconLock },
    { label: "Settings", icon: IconSettings },
    {
        label: "Account",
        icon: IconUser,
        links: [
            { label: "Enable 2FA", link: "/" },
            { label: "Change password", link: "/" },
            { label: "Recovery codes", link: "/" },
        ],
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: "#454545",
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

export function DashboardLeftNav() {
    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <Navbar height={800} width={{base:250}} p="md" className={classes.navbar}>
            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>
        </Navbar>
    );
}
