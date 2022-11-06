// Import all the mantine components being used in the file
import { ThemeContext } from "@emotion/react";
import { Avatar, Badge, Box, Divider, Group, Grid, Text, createStyles, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PasswordData from "./PasswordData";

const useStyles = createStyles((theme) => ({
    root: {
        // On hover of the row, change the background color to the lightest shade of gray
        "&:hover": {
            backgroundColor: theme.colors.gray[3],
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
        paddingLeft: + 32 + theme.spacing.sm,
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
    "sm": 18,
    "md": 20,
    "lg": 26,
};

const VaultRow = ({ site, provided, toggleModal }) => {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);


    const iconSize = isMobile ? 16 : 32;
    const badgeSize = isMobile ? "sm" : (isTablet ? "md" : "lg");
    return (
        <Box pl="sm" className={classes.root}>
            {/* Give the site header its own row */}
            <Grid justify="flex-start">
                <Grid.Col span={5}>
                    <Group 
                        spacing="sm"
                        className={classes.siteHeader}
                    >
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
            {site.account.map((account, i) => (
                <Grid key={i}>
                    <Grid.Col span={5}>       
                            <Group>
                                <Text
                                    color="gray-web"
                                    align="left"
                                    className={classes.accountText}
                                >
                                    {account.username}
                                </Text>
                            </Group>
                            
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div
                            data-rbd-drag-handle-context-id={provided?.dragHandleProps?.["data-rbd-drag-handle-context-id"]}
                            data-rbd-drag-handle-draggable-id="prevent-drag"
                            style={{
                                cursor: "auto"
                            }}
                        >
                            <ScrollArea offsetScrollbars>
                                <Group
                                    key={i}
                                    spacing="sm"
                                    className={classes.tagsWrapper}
                                >
                                    {account.tags.length == 0 && (
                                        <Box sx={{ width: "12px", height: badgeHeights[badgeSize]}}/>
                                    )}
                                    {account.tags.map((tag, j) => (
                                        <Badge key={j} radius="sm" size={badgeSize}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </Group>
                            </ScrollArea>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <PasswordData 
                            account={account} 
                            toggleModal={toggleModal}
                        />     
                    </Grid.Col>
                </Grid>
            ))}
            <Divider mb="xs"/>  
        </Box>
     );
}
 
export default VaultRow;