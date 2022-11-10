import { Code, Group, Navbar, ScrollArea, createStyles, UnstyledButton, ThemeIcon } from "@mantine/core";
import {
    IconLock,
    IconSettings,
    IconShieldLock,
    IconKey,
    IconMenu2,
    IconChevronLeft,
} from "@tabler/icons";

import { LinksGroup } from "./NavbarLinksGroups";
import { useState } from "react";



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
    const { classes } = useStyles();
    const [opened, setOpened] = useState(true);

    const mockdata = [
        { label: "All Passwords", icon: IconLock },
        {
            label: "Vaults",
            icon: IconKey,
            initiallyOpened: opened,
            links: [
                { label: "Personal", link: "/" },
                { label: "School", link: "/" },
                { label: "Club", link: "/" },
                { label: "Job", link: "/" },
            ],
        },
        { label: "Password Generator", icon: IconShieldLock },
        { label: "Settings", icon: IconSettings },
    ];

    const links = mockdata.map((item) => <LinksGroup {...item} openSidebar={setOpened} key={item.label} />);

    return (
        <Navbar height={800} width={{base: opened ? 250 : 62}} p="md" className={classes.navbar}>
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
