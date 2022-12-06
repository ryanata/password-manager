
import { useState } from "react";
import { Loader, Center, Text, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useVaults, useVault, useDebounce, useVaultSearch } from "../helpers/Hooks";
import VaultHeader from "./VaultHeader";
import SearchBar from "./SearchBar";
import VaultRow from "./VaultRow";
import MasterPasswordModal from "./MasterPasswordModal";

const VaultData = ({ id, name, searchTerm }) => {
    const { data, isLoading, isError } = useVault(id);
    // Get vault search data
    const searchTermDebounced = useDebounce(searchTerm, 500);
    const { data: searchData, isLoading: searchLoading, error: searchError } = useVaultSearch(id, searchTermDebounced);
    const [masterPassModalOpened, { toggle: toggleMasterPassModal }] = useDisclosure(false);

    if (isLoading || searchLoading) {
        return (
            <Center style={{ width: "100%", height: "80vh" }}>
                <Loader size="xl" color="steel-blue" />
            </Center>
        )
    }

    if (isError || searchError) {
        return (
            <Center style={{ width: "100%", height: "80vh" }}>
                <Text>{`Couldn't get this vault 😢. Try refreshing the page to re-fetch ${name}.`}</Text>
            </Center>
        )
    }

    const vault = searchData ? 
    {
        ...data.vault,
        sites: searchData.sites,
    }
    : 
    {
        ...data.vault,
        sites: data.vault.sites,
    };

    console.log(vault);
    return (
        <>
            {vault.sites.map((site) => <VaultRow key={site._id} site={site} toggleModal={toggleMasterPassModal} vaultId={vault._id} preventContext/>)}
            <MasterPasswordModal
                opened={masterPassModalOpened}
                closed={toggleMasterPassModal}
                password={vault.masterPassword}
                vaultName={vault.name}
                vaultId={vault._id}
            />
        </>
    )
}

const AllPasswords = () => {
    const { data: vaultRequest, isLoading, isError } = useVaults();
    const [search, setSearch] = useState("");

    if (isLoading) {
        return (
            <Center style={{ width: "100%", height: "80vh" }}>
                <Loader size="xl" color="steel-blue" />
            </Center>
        )
    }

    if (isError) {
        return (
            <Center style={{ width: "100%", height: "80vh" }}>
                <Text>Couldn't get vaults 😢. Try refreshing the page to re-fetch.</Text>
            </Center>
        )
    }


    const vaults = vaultRequest.data.vaults;
    return ( 
        <>
            <SearchBar setSearch={setSearch} disableAdd/>
            <Space h="sm"/>
            <VaultHeader sort="none" toggleSort={() => {}}/>
            {vaults.map((vault) => <VaultData id={vault.id} name={vault.name} searchTerm={search}/>)}
        </>
    );
}
 
export default AllPasswords;