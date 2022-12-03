import { Badge, Group, ScrollArea, ThemeIcon, createStyles, UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { useTags } from "../helpers/Hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";

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

const BadgeFilter = ({tag, filteredTags, setFilteredTags, size}) => {
    const selected = filteredTags.length == 0 || filteredTags.includes(tag._id);

    return (
        <UnstyledButton
            onClick={() => {
                if (selected) {
                    if (filteredTags.length == 0){
                        // Add the tag to the list of filtered tags
                        setFilteredTags([tag._id]);
                    } else {
                        // Unselect the tag
                        setFilteredTags(filteredTags.filter((t) => t != tag._id));
                    }
                } else {
                    // Select the tag
                    setFilteredTags([...filteredTags, tag._id]);
                }
            }}
        >
            <Badge
                color={tag.color}
                variant={filteredTags.length == 0 ? "outline" : (selected ? "filled" : "outline")}
                size={size}
                radius="sm"
            > 
                {tag.name}
            </Badge>
        </UnstyledButton>
    )
}

export function TagCarousel({tags, filteredTags, setFilteredTags}) {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);
    

    // const iconSize = isMobile ? 16 : 32;
    const badgeSize = isMobile ? "sm" : isTablet ? "md" : "lg";

    return (
        <Group position="left" mt="lg">
            <ScrollArea offsetScrollbars style={{ overflowX: "scroll", width: "90%" }}>
                <Group spacing="sm" className={classes.tagsWrapper}>
                    {tags.map((tag) => (
                            <BadgeFilter key={tag._id} filteredTags={filteredTags} setFilteredTags={setFilteredTags} tag={tag} size={badgeSize}/>
                    ))}
                </Group>
            </ScrollArea>
        </Group>
    );
}
