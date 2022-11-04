import { createStyles, Avatar, Chip, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import MasterPasswordModal from "./MasterPasswordModal";
import PasswordData from "./PasswordData";

const useStyles = createStyles((theme) => ({
    borderBottom: {
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
    tagsWrapper: {
        margin: 0,
        fontSize: theme.fontSizes.lg,
        flexWrap: "nowrap",
        overflow: "scroll",
    },
}));

const VaultRows = ({ children, data, rowSpans }) => {
    const { classes, theme } = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [masterPassModalOpened, { toggle: toggleMasterPassModal }] = useDisclosure(false);
    // If user has no passwords in the vault, show a message
    if (data.length === 0) {
        return (
            <tbody>
                <tr className={classes.borderBottom}>
                    <td colSpan="5">
                        <Text weight={500} align="center">
                            Nothing found
                        </Text>
                    </td>
                </tr>
                {children}
            </tbody>
        );
    }

    return (
        <tbody>
            {data.map((site, i) => (
                <tr key={i}>
                    {/* Name */}
                    <td colSpan={rowSpans[0]}>
                        <Stack spacing="sm">
                            <UnstyledButton>
                                <Group pl="xs">
                                    <Avatar
                                        size="32px"
                                        variant="outline"
                                        src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=${32}`}
                                    />
                                    <Text weight={500} size="xl">
                                        {site.name}
                                    </Text>
                                </Group>
                            </UnstyledButton>
                            {site.account.map((account, i) => (
                                /* Padding-left is calculated from Group padding left + Group flex spacing + avatar width */
                                <Text
                                    key={i}
                                    size="lg"
                                    color="gray-web"
                                    align="left"
                                    pl={theme.spacing.sm + theme.spacing.md + 32}
                                >
                                    {account.username}
                                </Text>
                            ))}
                        </Stack>
                    </td>
                    {/* Tags */}
                    <td colSpan={rowSpans[1]} style={{ overflow: "hidden" }}>
                        {site.account.map((account, i) => (
                            /* For every account, create a scroll area and grid for the tags*/
                            <Group
                                key={i}
                                pt={i == 0 ? 32 + theme.spacing.sm : theme.spacing.sm}
                                spacing="sm"
                                className={classes.tagsWrapper}
                            >
                                {account.tags.map((tag, j) => (
                                    <Chip
                                        type="radio"
                                        defaultChecked
                                        color="yellow"
                                        variant="filled"
                                        radius="sm"
                                        key={j}
                                        styles={{ iconWrapper: { display: "none" } }}
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </Group>
                        ))}
                    </td>
                    {/* Password */}
                    <td colSpan={rowSpans[2]}>
                        {site.account.map((account, i) => (
                            <PasswordData 
                                account={account} 
                                key={i} 
                                i={i} 
                                toggleModal={toggleMasterPassModal}/>
                        ))}
                    </td>
                </tr>
            ))}
            {children}
            <MasterPasswordModal opened={masterPassModalOpened} closed={toggleMasterPassModal} />
        </tbody>
    );
};

export default VaultRows;
