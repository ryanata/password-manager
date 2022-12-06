import { Affix, Avatar, Badge, Box, Button, Divider, Grid, Group, Menu, ScrollArea, Text, createStyles } from "@mantine/core";
import { useMediaQuery, useClickOutside, useDisclosure } from "@mantine/hooks";
import { deleteSite } from "../helpers/Hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import PasswordData from "./PasswordData";
import EditModal from "./EditSiteModal";
import DeleteWarning from "./DeleteWarning";

const useStyles = createStyles((theme) => ({
    root: {
        // On hover of the row, change the background color to the lightest shade of gray
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
        },
    },
    siteHeader: {
        flexWrap: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        paddingLeft: "sm",
        [theme.fn.smallerThan("sm")]: {
            paddingLeft: 0,
        },
    },
    tagsWrapper: {
        margin: 0,
        flexWrap: "nowrap",
    },
    text: {
        fontSize: theme.fontSizes.md,
        [theme.fn.smallerThan("sm")]: {
            fontSize: theme.fontSizes.sm,
        },
        [theme.fn.smallerThan("xs")]: {
            fontSize: theme.fontSizes.xs,
        },
    },
    headerText: {
        fontSize: theme.fontSizes.lg,
        [theme.fn.smallerThan("sm")]: {
            fontSize: theme.fontSizes.md,
        },
        [theme.fn.smallerThan("xs")]: {
            fontSize: theme.fontSizes.sm,
        },
    },
    accountText: {
        // Padding left = icon size + flex gap
        paddingLeft: +32 + theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        [theme.fn.smallerThan("sm")]: {
            paddingLeft: 16 + theme.spacing.sm,
            fontSize: theme.fontSizes.sm,
        },
        [theme.fn.smallerThan("xs")]: {
            fontSize: theme.fontSizes.xs,
        },
    },
}));

const badgeHeights = {
    sm: 18,
    md: 20,
    lg: 26,
};

const VaultRow = ({ site, provided, toggleModal, preventContext, vaultId }) => {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);
    const [coords, setCoords] = useState({
        clientX: null,
        clientY: null
      });
    const ref = useClickOutside(() =>
        setCoords({ clientX: null, clientY: null })
    );
    const { id } = useParams();
    const [editModalOpened, { toggle: toggleEditModal }] = useDisclosure(false);
    const [deleteModalOpened, { toggle: toggleDeleteModal }] = useDisclosure(false);
    const [error, setError] = useState(false);
    const queryClient = useQueryClient();
    const queryTags = `getTags_${id}`;
    const queryVault = `getVault_${id}`;
    
    
    const handleContextMenu = (e) => {
        if (preventContext) return;
        e.preventDefault();
        const { clientX, clientY } = e;
        console.log(clientX, clientY);
        setCoords({ clientX, clientY });
    };

    const validCoords = coords.clientX !== null && coords.clientY !== null;
    const affixPosition = (coords.clientX !== null && coords.clientY !== null) ? 
                          { left: coords.clientX, top: coords.clientY } : undefined;
    const iconSize = isMobile ? 16 : 32;
    const badgeSize = isMobile ? "sm" : isTablet ? "md" : "lg";
    return (
        <Box pl="sm" onContextMenu={handleContextMenu} className={classes.root}>
            {/* Give the site header its own row */}
            <Grid justify="flex-start">
                <Grid.Col span={5}>
                    <Group spacing="sm" className={classes.siteHeader}>
                        <Avatar
                            size={iconSize}
                            variant="outline"
                            src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=${iconSize}`}
                        />
                        <Text weight={500} className={classes.headerText}>
                            {site.name}
                        </Text>
                    </Group>
                </Grid.Col>
            </Grid>
            {site?.accounts?.map((account, i) => (
                <Grid key={i}>
                    <Grid.Col span={5}>
                        <Group>
                            <Text color="gray-web" align="left" className={classes.accountText}>
                                {account.username}
                            </Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div
                            data-rbd-drag-handle-context-id={
                                provided?.dragHandleProps?.["data-rbd-drag-handle-context-id"]
                            }
                            data-rbd-drag-handle-draggable-id="prevent-drag"
                            style={{
                                cursor: "auto",
                            }}
                        >
                            <ScrollArea offsetScrollbars>
                                <Group key={i} spacing="sm" className={classes.tagsWrapper}>
                                    {account.tags.length == 0 && (
                                        <Box sx={{ width: "12px", height: badgeHeights[badgeSize] }} />
                                    )}
                                    {account.tags.map((tag, j) => (
                                        <Badge 
                                            key={j} 
                                            radius="sm"
                                            variant="filled"
                                            color={tag.color} 
                                            size={badgeSize}>
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </Group>
                            </ScrollArea>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <PasswordData account={account} toggleModal={toggleModal} vaultId={vaultId}/>
                    </Grid.Col>
                </Grid>
            ))}
            <Divider mb="xs" />
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
                    <Menu.Item onClick={toggleEditModal}>Edit</Menu.Item>
                    <Menu.Item color="red" onClick={toggleDeleteModal}>Delete site</Menu.Item>
                    </Menu.Dropdown>
                </div>
                </Menu>
                {editModalOpened && <EditModal opened={editModalOpened} closed={toggleEditModal} site={site}/>}
                {deleteModalOpened && (
                    <DeleteWarning 
                        opened={deleteModalOpened} 
                        closed={toggleDeleteModal} 
                        label="Are you sure you want to this delete this site?">
                            <Group position="right" mt="sm">
                                <Group spacing="xs">
                                    <Button variant="outline" onClick={toggleDeleteModal}>No</Button>
                                    <Button onClick={() => {
                                        // Close Modal
                                        toggleDeleteModal();
                                        // Delete site
                                        deleteSite(id, site._id)
                                            .then((res) => {
                                                console.log("Successfully deleted site");
                                                // Refetch queries
                                                queryClient.invalidateQueries([queryTags]);
                                                queryClient.invalidateQueries([queryVault]);
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                    }}>Yes</Button>
                                </Group>
                            </Group>
                    </DeleteWarning>)}
            </Affix>
        </Box>
    );
};

export default VaultRow;
