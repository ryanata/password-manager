/*import { SchemaTypeOptions } from 'mongoose';
import { createContex, useEffect, useState } from 'react';
import useUser from '../hooks/getAllVaultsQuery';

const { data, isLoading, error } = useUser();

const Vaults = () => {
    const [user, setVaults] = useState([]);
    useEffect(() => {
        fetch("https://pwdly.herokuapp.com/api/user/me")
            .then(res => res.json())
            .then(res => res.results)
            .then(vaults => setVaults(vaults))
            .catch(err => console.error("Problem fetching", err))
    })
}

export default Vaults;
//"https://pwdly.herokuapp.com/api/vault*/