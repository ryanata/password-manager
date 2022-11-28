import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarStats, IconChevronLeft, IconChevronRight, TablerIcon } from "@tabler/icons";
import { useEffect, useState } from "react";

import VaultModal from "./VaultModal";

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: "block",
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: "white",
        fontSize: theme.fontSizes.md,

        "&:hover": {
            backgroundColor: "#3A3A3A",
            color: "white",
        },
    },

    link: {
        fontWeight: 500,
        display: "block",
        textDecoration: "none",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.md,
        color: "#D4D4D4",
        borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

        "&:hover": {
            backgroundColor: "#3A3A3A",
            color: "D4D4D4",
        },
    },

    chevron: {
        transition: "transform 200ms ease",
    },
}));

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link, openSidebar }) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const [vaultModalOpened, { toggle: toggleVaultModal }] = useDisclosure(false);
    const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

    const items = (hasLinks ? [...links, {}] : []).map((link, index) => {
        if (index === links.length) {
            return (
                <UnstyledButton key={index} component="a" onClick={toggleVaultModal}>
                    Add Vault
                </UnstyledButton>
            );
        }

        // link.link is /dashboard/${vaultId}
        // get the vaultId from the link
        const vaultId = link.link.split("/")[2];
        // url is /dashboard/${vaultId} get the vaultId from the url
        const url = window.location.pathname.split("/")[2];
        const onVault = url === vaultId;
        return (
            <Text
                component="a"
                className={classes.link}
                href={link.link}
                key={link.label}
                align="left"
                sx={{ borderLeft: onVault && `3px solid ${theme.colors.green[5]}` }}
            >
                {link.label}
            </Text>
        );
    });

    useEffect(() => {
        if (!initiallyOpened && hasLinks) {
            setOpened(false);
        }
    }, [initiallyOpened]);

    return (
        <>
            <UnstyledButton
                onClick={() => {
                    if (hasLinks) {
                        if (!initiallyOpened) {
                            openSidebar(true);
                            setOpened(true);
                        } else {
                            setOpened((o) => !o);
                        }
                    } else if (link) {
                        // Redirect to link
                        window.location.href = link;
                    }
                }}
                title={label}
                className={classes.control}
            >
                <Group position="apart" spacing={0}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ThemeIcon variant="filled" size={30} color="transparent">
                            <Icon size={22} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            stroke={1.5}
                            style={{
                                transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
            <VaultModal opened={vaultModalOpened} closed={toggleVaultModal} />
        </>
    );
}

const mockdata = {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
        { label: "Upcoming releases", link: "/" },
        { label: "Previous releases", link: "/" },
        { label: "Releases schedule", link: "/" },
    ],
};

export function NavbarLinksGroup() {
    return (
        <Box
            sx={(theme) => ({
                minHeight: 220,
                padding: theme.spacing.md,
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            })}
        >
            <LinksGroup {...mockdata} />
        </Box>
    );
}
