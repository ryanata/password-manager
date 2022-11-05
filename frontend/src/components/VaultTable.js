import { Box, Center, Divider, Loader, ScrollArea, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import MasterPasswordModal from "./MasterPasswordModal";
import VaultRow from "./VaultRow";
import VaultHeader from "./VaultHeader";

const useStyles = createStyles((theme) => ({
    noSpacing: {
        padding: "0 !important",
        marginRight: "0 !important",
        marginLeft: "0 !important",
    },
}));


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
    const [masterPassModalOpened, { toggle: toggleMasterPassModal }] = useDisclosure(false);

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
        <>
            <Box className={classes.noSpacing}>
                <VaultHeader sort={sort} toggleSort={toggleSort}/>
                <Divider mb="xs"/>
                {/* Map through data and create a VaultRow component for each */}
                {sortByState().map((site, index) => (
                    <VaultRow key={index} site={site} toggleModal={toggleMasterPassModal} />
                ))}
            </Box>
            <MasterPasswordModal opened={masterPassModalOpened} closed={toggleMasterPassModal} />
        </>
    );
};

export default VaultTable;
