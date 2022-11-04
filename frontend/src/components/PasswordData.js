import { createStyles, Group, UnstyledButton } from "@mantine/core";
import { IconCopy, IconEye, IconEyeOff } from "@tabler/icons";
import { useState, useContext } from "react";
import { VaultContext } from "../contexts/VaultContext";

const useStyles = createStyles((theme) => ({
    input: {
        borderStyle: "none",
        fontSize: "inherit",
        backgroundColor: "inherit",
    },
    passwordWrapper: {
        margin: 0,
        fontSize: theme.fontSizes.lg,
    },
}));

const HiddenInput = ({ children, value }) => {
    const { classes, theme } = useStyles();
    return (
        <input type="text" readOnly value={value} className={classes.input} size={theme.spacing.sm}>
            {children}
        </input>
    );
};

const PasswordData = ({ account, i, toggleModal }) => {
    const { classes, theme } = useStyles();

    // Hooks
    const [showPassword, setShowPassword] = useState(false);
    const {vault, setVault} = useContext(VaultContext);

    // Handlers
    const showPasswordHandler = () => {
        if (vault.unlocked) {
            setShowPassword(!showPassword);
        } else {
            // Remmber that user wants to show password. This is important because
            // if the user fails to unlock the vault, we don't toggle state incorrectly
            setShowPassword(true);
            toggleModal();
        }
    }

    const copyHandler = () => {
        if (vault.unlocked) {
            navigator.clipboard.writeText(account.password);
        } else {
            toggleModal();
        }
    }


    return (
        <Group 
            pt={i == 0 ? 32 + theme.spacing.sm : theme.spacing.sm} 
            spacing="xl" 
            className={classes.passwordWrapper}
        >
            <HiddenInput value={(showPassword && vault.unlocked) ? account.password : "•••••••••••••••"} />
            <Group spacing="xs" className={classes.passwordWrapper}>
                <UnstyledButton onClick={showPasswordHandler}>
                    {(showPassword && vault.unlocked) ? <IconEye stroke={2} /> : <IconEyeOff stroke={2} />}
                </UnstyledButton>
                <UnstyledButton onClick={copyHandler}>
                    <IconCopy stroke={2} />
                </UnstyledButton>
            </Group>
        </Group>
    );
};

export default PasswordData;
