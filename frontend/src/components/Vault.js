import { useState } from "react";

import { Loader, Center, Text } from "@mantine/core";
import SearchBar from "./SearchBar";
import { TagCarousel } from "./TagCarousel";
import VaultTable from "./VaultTable";
import { useTags } from "../helpers/Hooks";
import { useParams } from "react-router-dom";

const Vault = () => {
    const [search, setSearch] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const { id } = useParams();
    const { data, isLoading, isError } = useTags(id);

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
                <Text>Couldn't get vault information 😢. Try refreshing the page to re-fetch.</Text>
            </Center>
        )
    }

    const tags = data.tags;

    return (
        <>
            <SearchBar setSearch={setSearch} />
            <TagCarousel tags={tags} setFilteredTags={setFilteredTags} filteredTags={filteredTags}/>
            <VaultTable tags={tags} searchTerm={search} filteredTags={filteredTags} />
        </>
    );
};

export default Vault;
