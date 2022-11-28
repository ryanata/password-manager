import { Badge, Button, Group, ScrollArea, ThemeIcon, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    root: {
        // On hover of the row, change the background color to the lightest shade of gray
        "&:hover": {
            backgroundColor: theme.colors.gray[3],
        },
    },
    tagsWrapper: {
        margin: 0,
        flexWrap: "nowrap",
    },
}));

const badgeHeights = {
    sm: 18,
    md: 20,
    lg: 26,
};

export function TagCarousel({ site, provided, toggleModal }) {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);

    // const iconSize = isMobile ? 16 : 32;
    const badgeSize = isMobile ? "sm" : isTablet ? "md" : "lg";

    return (
        <Group position="left">
            <>
                <ScrollArea offsetScrollbars style={{ overflowX: "scroll", width: "90%" }}>
                    <Group spacing="sm" className={classes.tagsWrapper}>
                        <Badge radius="sm" size={badgeSize}>
                            WORK
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            FINANCE
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            SOCIAL MEDIA
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            PERSONAL
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            SCHOOL
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            WORK
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            FINANCE
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            SOCIAL MEDIA
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            PERSONAL
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            SCHOOL
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                        <Badge radius="sm" size={badgeSize}>
                            Badge
                        </Badge>
                    </Group>
                </ScrollArea>

                <Group>
                    <ThemeIcon size="sm" color="#E5E5E5" mb="xs">
                        <IconPlus size={15} color="black" />
                    </ThemeIcon>
                </Group>
            </>
        </Group>
    );
}
