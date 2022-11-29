import { Box, Center, Loader, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import MasterPasswordModal from "./MasterPasswordModal";
import VaultHeader from "./VaultHeader";
import VaultRow from "./VaultRow";

const useStyles = createStyles((theme) => ({
    noSpacing: {
        padding: "0 !important",
        marginRight: "0 !important",
        marginLeft: "0 !important",
    },
}));

// TODO: DELETE ALL THESE FUNCTIONS WHEN API IS READY
const createVaultData = () => {
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
    // Set local storage for testing
    localStorage.setItem("vault", JSON.stringify(data));
};

const getVaultData = () => {
    let data = [];
    try {
        data = JSON.parse(localStorage.getItem("vault"));
        if (!data) {
            throw new Error("No vault set");
        }
    } catch (error) {
        createVaultData();
        // Create a promise that rejects after 1 second
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(error);
            }, 1000);
        })
    }
    // create a promise that resolves after 1 second
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
};

const updateVaultData = (data) => {
    localStorage.setItem("vault", JSON.stringify(data));
    // create a promise that resolves after 1 second
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 100);
    });
};

const VaultTable = () => {
    const { classes, theme } = useStyles();
    const [sort, setSort] = useState("unsorted");
    const { data, isLoading, error } = useQuery(["vault"], getVaultData);
    const queryClient = new useQueryClient();
    const { mutate } = useMutation(updateVaultData, {
        onMutate: async (newData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(["vault"]);
            // Snapshot the previous value
            const previousData = queryClient.getQueryData(["vault"]);
            // Optimistically update to the new value
            queryClient.setQueryData(["vault"], newData);
            // Return a context object with the snapshotted value
            return { previousData };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newData, context) => {
            queryClient.setQueryData(["vault"], context.previousData);
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(["vault"]);
        },
    });
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

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        // Update data
        const items = Array.from(data.sites);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        mutate({ sites: items });
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

    return (
        <>
            <Box className={classes.noSpacing}>
                <VaultHeader sort={sort} toggleSort={toggleSort} />
                {sort === "unsorted" ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="sites">
                            {(provided) => (
                                <Box {...provided.droppableProps} ref={provided.innerRef}>
                                    {/* Map through data and create a VaultRow component for each */}
                                    {data?.sites.map((site, index) => (
                                        <Draggable key={site.name} draggableId={site.name} index={index}>
                                            {(provided) => (
                                                <Box
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    id={site.name}
                                                >
                                                    <VaultRow
                                                        site={site}
                                                        provided={provided}
                                                        toggleModal={toggleMasterPassModal}
                                                    />
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    sortByState().map((site, index) => (
                        <VaultRow key={index} site={site} toggleModal={toggleMasterPassModal} />
                    ))
                )}
            </Box>
            <MasterPasswordModal opened={masterPassModalOpened} closed={toggleMasterPassModal} />
        </>
    );
};

export default VaultTable;
