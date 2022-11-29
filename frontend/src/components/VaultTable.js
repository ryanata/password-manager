import { Box, Center, Loader, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useVault } from "../helpers/Hooks";

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
    const { id } = useParams();
    // Get vault data should take in id
    const { data, isLoading, error } = useVault(id);
    const queryId = `vault_${id}`;
    const queryClient = new useQueryClient();
    const { mutate } = useMutation(updateVaultData, {
        onMutate: async (newData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([queryId]);
            // Snapshot the previous value
            const previousData = queryClient.getQueryData([queryId]);
            // Optimistically update to the new value
            queryClient.setQueryData([queryId], newData);
            // Return a context object with the snapshotted value
            return { previousData };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newData, context) => {
            queryClient.setQueryData([queryId], context.previousData);
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries([queryId]);
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
                <Text>Invalid vaulte route.</Text>
            </Center>
        );
    }

    const vault = data.data.vault;

    // Sort data by state in 'sort'
    const sortByState = () => {
        if (sort === "ascending") {
            return [...vault.sites].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "descending") {
            return [...vault.sites].sort((a, b) => b.name.localeCompare(a.name));
        } else {
            // Return cached vault stored in useQuery
            return vault.sites;
        }
    };

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
                                    {vault?.sites?.map((site, index) => (
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
                    sortByState()?.map((site, index) => (
                        <VaultRow key={index} site={site} toggleModal={toggleMasterPassModal} />
                    ))
                )}
            </Box>
            <MasterPasswordModal opened={masterPassModalOpened} closed={toggleMasterPassModal} password={vault.masterPassword} />
        </>
    );
};

export default VaultTable;
