import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { Avatar } from '@rneui/themed';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
//import passwordRow from './VaultRow';
import axios from 'axios';
import VaultTable from '../components/VaultTable';


const VaultId = () => {
    const id = "none"
    return id;
}

const VaultPage = () => {
    

    return(
        <VaultTable 
            id = {VaultId()}
        />
    )
}


export default VaultPage;