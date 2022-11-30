import { useState } from "react";

import SearchBar from "./SearchBar";
import { TagCarousel } from "./TagCarousel";
import VaultTable from "./VaultTable";

const Vault = () => {
    const [search, setSearch] = useState("");
    return (
        <>
            <SearchBar setSearch={setSearch} />
            <TagCarousel />
            <VaultTable searchTerm={search} />
        </>
    );
};

export default Vault;
