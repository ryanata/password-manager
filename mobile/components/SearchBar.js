import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import {Keyboard} from 'react-native'

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
            onIconPress={() => {Keyboard.dismiss()}}
        />
    );
}

export default CustomSearchbar