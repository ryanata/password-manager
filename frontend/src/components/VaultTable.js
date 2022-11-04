import {
    createStyles,
    Anchor,
    Avatar,
    Box,
    Grid,
    Icon,
    Center,
    Chip,
    Loader,
    UnstyledButton,
    Group,
    Text,
    Table,
    ScrollArea,
    Stack,
} from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp, IconEyeOff, IconEye, IconCopy } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VaultRows from "./VaultRows";

const useStyles = createStyles((theme) => ({
    table: {
        tableLayout: "fixed",
    },
    th: {
        padding: "0 !important",
    },
    control: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

const Icons = {
    ascending: IconChevronUp,
    descending: IconChevronDown,
    unsorted: IconSelector,
};

// Header
const Th = ({ children, sort, colSpan, onSort }) => {
    const { classes } = useStyles();
    const Icon = Icons[sort];
    return (
        <th colSpan={colSpan} className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
};

const getVaultData = () => {
    const data = {
        sites: [
            {
                name: "google.com",
                url: "https://google.com",
                account: [
                    {
                        username: "john.doe",
                        password: "password",
                        tags: ["work", "finance"],
                    },
                    {
                        username: "rambo41",
                        password: "password41asdjqwodjqwodjqiwodjqwoi",
                        tags: ["work"],
                    },
                ],
            },
            {
                name: "facebook.com",
                url: "https://facebook.com",
                account: [
                    {
                        username: "john.doe2",
                        password: "password2",
                        tags: ["social media"],
                    },
                    {
                        username: "rambo42",
                        password: "password42",
                        tags: ["social media"],
                    },
                ],
            },
            {
                name: "github.com",
                url: "https://github.com",
                account: [
                    {
                        username: "john.doe3",
                        password: "password3",
                        tags: [],
                    },
                ],
            },
            {
                name: "amazon.com",
                url: "https://amazon.com",
                account: [
                    {
                        username: "john.doe4",
                        password: "password4",
                        tags: [
                            "work",
                            "finance",
                            "shopping",
                            "social media",
                            "work",
                            "finance",
                            "shopping",
                            "social media",
                        ],
                    },
                ],
            },
            {
                name: "reddit.com",
                url: "https://reddit.com",
                account: [
                    {
                        username: "john.doe5",
                        password: "password5",
                        tags: ["social media"],
                    },
                ],
            },
            {
                name: "twitter.com",
                url: "https://twitter.com",
                account: [
                    {
                        username: "john.doe6",
                        password: "password6",
                        tags: ["social media"],
                    },
                ],
            },
            {
                name: "youtube.com",
                url: "https://youtube.com",
                account: [
                    {
                        username: "john.doe7",
                        password: "password7",
                        tags: ["social media"],
                    },
                ],
            },
            {
                name: "netflix.com",
                url: "https://netflix.com",
                account: [
                    {
                        username: "john.doe8",
                        password: "password8",
                        tags: ["social media"],
                    },
                ],
            },
        ],
    };
    // create a promise that resolves after 1 second
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
};

const VaultTable = () => {
    const { classes, theme } = useStyles();
    const [sort, setSort] = useState("unsorted");
    const { data, isLoading, error } = useQuery(["vault"], getVaultData);

    // Cycle through sort states
    const toggleSort = () => {
        if (sort === "ascending") {
            setSort("descending");
        } else if (sort === "descending") {
            setSort("unsorted");
        } else {
            setSort("ascending");
        }
    };

    // Sort data by state in 'sort'
    const sortByState = () => {
        if (sort === "ascending") {
            return [...data.sites].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "descending") {
            return [...data.sites].sort((a, b) => b.name.localeCompare(a.name));
        } else {
            // Return cached data stored in useQuery
            return data.sites;
        }
    };

    if (isLoading) {
        return (
            <Center style={{ width: "100%", height: "100%" }}>
                <Loader size="xl" color="steel-blue" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center style={{ width: "100%", height: "100%" }}>
                <Text>Something went wrong, please refresh the page.</Text>
            </Center>
        );
    }

    console.log(sort);
    return (
        <ScrollArea>
            <Table className={classes.table}>
                <thead>
                    <tr>
                        <Th
                            colSpan="43"
                            sort={sort}
                            onSort={() => {
                                toggleSort();
                            }}
                        >
                            NAME
                        </Th>
                        <th colSpan="33">TAGS</th>
                        <th colSpan="24">PASSWORD</th>
                    </tr>
                </thead>
                <VaultRows data={sortByState()} rowSpans={[43, 33, 24]} />
            </Table>
        </ScrollArea>
    );
};

export default VaultTable;
