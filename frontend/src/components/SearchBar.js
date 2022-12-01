import { Button, Group, TextInput, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons";
import AccountModal from "./AccountModal";

const SearchBar = ({ setSearch }) => {
    const [accountModalOpened, { toggle: toggleAccountModal }] = useDisclosure(false);

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

            <AccountModal
                opened={accountModalOpened}
                closed={toggleAccountModal}
            />
        </Group>
    );
};

export default SearchBar;
