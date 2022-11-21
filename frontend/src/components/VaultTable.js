import { Box, Center, Loader, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import MasterPasswordModal from "./MasterPasswordModal";
import VaultHeader from "./VaultHeader";
import VaultRow from "./VaultRow";
import { VaultContext } from "../helpers/Hooks";
import axios from "axios";

const useStyles = createStyles((theme) => ({
    noSpacing: {
        padding: "0 !important",
        marginRight: "0 !important",
        marginLeft: "0 !important",
    },
}));

const getVaultData = async (currentVault, userID) => {
    try {
        const data =  await axios.get("/api/vault", { 
            params: {
                userID: userID,
            }}
        );
        return new Promise((resolve, reject) => {
            const vault = data.data.vaults.find((vault) => vault.name === currentVault.name);
            if (vault) {
                resolve(vault);
            } else {
                reject("No vault found");
            }
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
};

const updateVaultData = (data) => {
    // Grab new order of sites
    const newSiteOrder = data.sites.map((site) => site._id);
    return axios.put(`/api/vault/${data.vaultID}`, {sites: newSiteOrder});
};

const VaultTable = () => {
    const { classes, theme } = useStyles();
    const [sort, setSort] = useState("unsorted");
    const { vault } = useContext(VaultContext);
    const queryClient = new useQueryClient();
    const userID = queryClient.getQueryData(["getUser"]).data._id;
    const { data, isLoading, error } = useQuery(["vault"], () => {return getVaultData(vault, userID)});
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
        mutate({ sites: items, vaultID: data._id });
    };

    if (isLoading) {
        return (
            <Center style={{ width: "100%", height: "100%" }}>
                <Loader size="xl" color="steel-blue" />
            </Center>
        );
    }

    if (error) {
        console.log(error);
        return (
            <Center style={{ width: "100%", height: "100%" }}>
                <Text>Something went wrong, please refresh the page.</Text>
            </Center>
        );
    }

    // const vaultData = data.data.vaults.find((vault) => vault.name === vault);
    console.log(data);
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
