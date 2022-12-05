import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const CustomSearchbar = ({setSearch}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        setSearch(query);
    }
    return(
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
}

export default CustomSearchbar