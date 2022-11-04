import { Button, Group, TextInput } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";

export function SearchBar() {
    return (
        <Group>
            <TextInput icon={<IconSearch size={28} />} placeholder="Search" />
            <Button
                uppercase
                leftIcon={<IconPlus size={28} />}
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
        </Group>
    );
}
