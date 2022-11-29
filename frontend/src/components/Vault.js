
import SearchBar from "./SearchBar";
import VaultTable from "./VaultTable";
import { useState } from "react";

const Vault = () => {
    const [search, setSearch] = useState("");
    return (
        <>
            <SearchBar setSearch={setSearch}/>
            <VaultTable searchTerm={search}/>
        </> 
     );
}
 
export default Vault;