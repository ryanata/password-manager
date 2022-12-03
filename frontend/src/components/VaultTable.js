import { Box, Center, Loader, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import { setSites, useDebounce, useVault, useVaultSearch } from "../helpers/Hooks";
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
    return setSites(data.vaultId, data.sites);
};

const VaultTable = ({ tags, searchTerm, filteredTags }) => {
    const { classes, theme } = useStyles();
    const [sort, setSort] = useState("unsorted");
    const { id } = useParams();
    // Get vault data
    const { data, isLoading, error } = useVault(id);
    // Get vault search data
    const searchTermDebounced = useDebounce(searchTerm, 500);
    const { data: searchData, isLoading: searchLoading, error: searchError } = useVaultSearch(id, searchTermDebounced);
    const queryId = `getVault_${id}`;
    const queryClient = new useQueryClient();
    const { mutate } = useMutation(updateVaultData, {
        onMutate: async (newData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([queryId]);
            // Snapshot the previous value
            const previousData = queryClient.getQueryData([queryId]);
            const formattedData = {
                message: previousData.message,
                vault: {
                    ...previousData.vault,
                    sites: newData.sites,
                },
            };
            // Optimistically update to the new value
            queryClient.setQueryData([queryId], formattedData);
            // Return a context object with the snapshotted value
            return { previousData };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newData, context) => {
            console.log(err);
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

    if (isLoading || searchLoading) {
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

    const filterTags = (sites) => {
        // Tags holds all the tags that can be selected
        // filteredTags holds the tags that are selected
        // If there are no selected tags or all tags are selected, return all sites
        if (filteredTags.length === 0 || filteredTags.length === tags.length) {
            return sites;
        }
        
        // Return sites array with accounts filtered by tags
        const fSites = sites.map((site) => {
            return {
                ...site,
                accounts: site.accounts.filter((account) => {
                    // If any of the account tags are in the filteredTags array, return true
                    return account.tags.some((tag) => filteredTags.includes(tag._id));
                }),
            };
        });
        // Filter out sites that have no accounts
        return fSites.filter((site) => site.accounts.length > 0);
    };

    const vault = searchData ? 
        {
            ...data.vault,
            sites: filterTags(searchData.sites),
        }
        : 
        {
            ...data.vault,
            sites: filterTags(data.vault.sites),
        };

    
    const isFiltered = !(filteredTags.length === 0 || filteredTags.length === tags.length);
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination || searchTerm || isFiltered) {
            return;
        }
        // Update data
        const items = Array.from(vault.sites);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        mutate({ vaultId: id, sites: items });
    };

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
            <MasterPasswordModal
                opened={masterPassModalOpened}
                closed={toggleMasterPassModal}
                password={vault.masterPassword}
            />
        </>
    );
};

export default VaultTable;
