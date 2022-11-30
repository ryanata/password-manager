import { Badge, Button, Group, ScrollArea, ThemeIcon, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { useTags } from "../helpers/Hooks";
import { useParams } from "react-router-dom";

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

export function TagCarousel() {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);
    const { id } = useParams();
    const { data, isLoading, isError } = useTags(id);

    // const iconSize = isMobile ? 16 : 32;
    const badgeSize = isMobile ? "sm" : isTablet ? "md" : "lg";

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        console.log("Error loading tags");
        return <></>;
    }

    return (
        <Group position="left" mt="lg">
            <>
                <ScrollArea offsetScrollbars style={{ overflowX: "scroll", width: "90%" }}>
                    <Group spacing="sm" className={classes.tagsWrapper}>
                        {data.tags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    color={tag.colorHEX}
                                    variant="filled"
                                    size={badgeSize}
                                >
                                    {tag.name}
                                </Badge>
                            )
                        )}
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
