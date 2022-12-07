import { Button, Group, TextInput, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AccountModal from "./AccountModal";

const SearchBar = ({ setSearch, disableAdd }) => {
    const [accountModalOpened, { toggle: toggleAccountModal }] = useDisclosure(false);
    const { id } = useParams();
    const queryClient = useQueryClient();
    const queryTags = `getTags_${id}`;
    const queryVault = `getVault_${id}`;

    const onClose = () => {
        toggleAccountModal();
        queryClient.invalidateQueries([queryTags]);
        queryClient.invalidateQueries([queryVault]);
    };

    return (
        <Group position="apart">
            <TextInput
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                size="md"
                icon={<IconSearch size={26} />}
                placeholder="Search"
                styles={(theme) => ({
                    root: {
                        flex: 1,
                    },
                })}
            />
            {!disableAdd && (
                <Button
                    size="md"
                    uppercase
                    leftIcon={<IconPlus size={28} />}
                    onClick={toggleAccountModal}
                    styles={(theme) => ({
                        root: {
                            backgroundColor: "#4681D0",
                            fontSize: 18,
                            paddingLeft: 10,
                            paddingRight: 10,
                            "&:hover": {
                                backgroundColor: theme.fn.darken("#4681D0", 0.05),
                            },
                        },
                    })}
                >
                    add new
                </Button>
            )}

            {accountModalOpened && <AccountModal opened={accountModalOpened} closed={onClose} />}
        </Group>
    );
};

export default SearchBar;
