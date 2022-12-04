import { Affix, Box, Button, Collapse, Group, Menu, Text, ThemeIcon, UnstyledButton, createStyles } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconCalendarStats, IconChevronLeft, IconChevronRight, TablerIcon } from "@tabler/icons";
import { deleteVault } from "../helpers/Hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import VaultModal from "./VaultModal";
import DeleteWarning from "./DeleteWarning";

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

const DrawerLink = ({ link }) => {
    const { classes, theme } = useStyles();
    const [deleteVaultOpened, { toggle: toggleDeleteVault }] = useDisclosure(false);
    const navigate = useNavigate();
    // Context menu
    const [coords, setCoords] = useState({
        clientX: null,
        clientY: null
    });
    const ref = useClickOutside(() =>
    setCoords({ clientX: null, clientY: null })
    );
    const queryClient = useQueryClient();
    
    // link.link is /dashboard/${vaultId}
    // get the vaultId from the link
    const vaultId = link.link.split("/")[2];
    const userId = queryClient.getQueryData(["getUser"]).data._id;
    // url is /dashboard/${vaultId} get the vaultId from the url
    const url = window.location.pathname.split("/")[2];
    const onVault = url === vaultId;

    const handleContextMenu = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        setCoords({ clientX, clientY });
    };
    const validCoords = coords.clientX !== null && coords.clientY !== null;
    const affixPosition = (coords.clientX !== null && coords.clientY !== null) ? 
                          { left: coords.clientX, top: coords.clientY } : undefined;
    return (
        <>
            <div onContextMenu={handleContextMenu}>
                <Text
                    component="a"
                    className={classes.link}
                    onClick={() => {
                        navigate(link.link);
                    }}
                    align="left"
                    sx={{
                        borderLeft: onVault && `3px solid ${theme.colors.green[5]}`,
                        cursor: "pointer",
                    }}
                >
                    {link.label}
                </Text>
            </div>
            <Affix
                sx={{ display: validCoords ? "initial" : "none" }}
                position={affixPosition}
            >
                <Menu opened={validCoords} width={150}>
                    <div ref={ref}>
                        <Menu.Target>
                        <div />
                        </Menu.Target>
                        <Menu.Dropdown>
                        <Menu.Item color="red" onClick={toggleDeleteVault}>Delete vault</Menu.Item>
                        </Menu.Dropdown>
                    </div>
                </Menu>
                {deleteVaultOpened && (
                    <DeleteWarning
                        opened={deleteVaultOpened}
                        toggle={toggleDeleteVault}
                        label="Are you sure you want to delete this vault?">
                        <Group position="right" mt="sm">
                                <Group spacing="xs">
                                    <Button variant="outline" onClick={toggleDeleteVault}>No</Button>
                                    <Button onClick={() => {
                                        // Close Modal
                                        toggleDeleteVault();
                                        // Delete vault
                                        deleteVault(vaultId, userId)
                                        .then((res) => {
                                            // Navigate to dashboard
                                            navigate("/dashboard");
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    }}>
                                        Yes
                                    </Button>
                                </Group>
                            </Group>
                    </DeleteWarning>
                )}
            </Affix>
        </>
    )
}

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

        return (
            <DrawerLink key={index} link={link} />
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
                        // Redirect to link (this is for all non-vault links)
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
            {vaultModalOpened && <VaultModal opened={vaultModalOpened} closed={toggleVaultModal} />}
        </>
    );
}

