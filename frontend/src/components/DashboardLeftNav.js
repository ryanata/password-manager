import { Code, Group, Navbar, ScrollArea, ThemeIcon, UnstyledButton, createStyles } from "@mantine/core";
import { IconChevronLeft, IconKey, IconLock, IconMenu2, IconSettings, IconShieldLock } from "@tabler/icons";
import { useState } from "react";

import { useVaults } from "../helpers/Hooks";
import { LinksGroup } from "./NavbarLinksGroups";

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
        borderBottom: "1px solid #3A3939",
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: 0,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

export function DashboardLeftNav() {
    // styles
    const { classes } = useStyles();

    // Hooks
    const [opened, setOpened] = useState(true);
    const { data, isLoading, isError } = useVaults();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const vaults = data.data.vaults;
    const navLinks = vaults.map((vault) => ({
        label: vault.name,
        link: `/dashboard/${vault.id}`,
    }));

    const navData = [
        {
            label: "All Passwords",
            icon: IconLock,
            link: "/dashboard/all-passwords",
        },
        {
            label: "Vaults",
            icon: IconKey,
            initiallyOpened: opened,
            links: navLinks,
        },
        {
            label: "Password Generator",
            icon: IconShieldLock,
            link: "/dashboard/password-generator",
        },
        {
            label: "Settings",
            icon: IconSettings,
            link: "https://www.google.com/",
        },
    ];

    const links = navData.map((item) => <LinksGroup {...item} openSidebar={setOpened} key={item.label} />);

    return (
        <Navbar height={800} width={{ base: opened ? 250 : 62 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <UnstyledButton onClick={() => setOpened(!opened)}>
                        <ThemeIcon variant="filled" size={30} color="transparent">
                            <IconMenu2 size={22} />
                        </ThemeIcon>
                    </UnstyledButton>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>
        </Navbar>
    );
}
