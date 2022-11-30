
import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { Avatar } from '@rneui/themed';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import VaultRow from './VaultRow';
import axios from 'axios';
import useVault from '../hooks/getAllVaultsQuery';



const setSites = (vaultId, sites) => {
    // Return promise to wrap axios call
    return new Promise((resolve, reject) => {
        axios   
            .put(`/api/vault/${vaultId}/setSites`, { sites })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

//const fetchData = ()

const updateVaultData = (data) => {
    return setSites(data.vaultId, data.sites);
};


const VaultTable = ({id}) => {
    const { data, isLoading, error } = useVault();
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
    return(
        <SafeAreaView style = {styles.container}>
            <ScrollView style = {styles.scrollView}>
                {vault?.sites?.map((site, index) => (
                    <VaultRow
                        site = {site}
                    /> 
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      //backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
});

export default VaultTable;
  
 