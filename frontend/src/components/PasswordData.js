import { Group, UnstyledButton, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCopy, IconEye, IconEyeOff } from "@tabler/icons";
import { useContext, useState } from "react";

import { VaultContext } from "../helpers/Hooks";

const useStyles = createStyles((theme) => ({
    input: {
        borderStyle: "none",
        backgroundColor: "inherit",
        fontSize: theme.fontSizes.md,
        [theme.fn.smallerThan("sm")]: {
            fontSize: theme.fontSizes.sm,
        },
        [theme.fn.smallerThan("xs")]: {
            fontSize: theme.fontSizes.xs,
        },
    },
    root: {
        flexWrap: "nowrap",
    },
    iconContainer: {
        flexWrap: "nowrap",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}));

const HiddenInput = ({ children, value, passwordHandler }) => {
    const { classes, theme } = useStyles();

    return (
        <input onClick={passwordHandler} type="text" readOnly value={value} className={classes.input} size={theme.spacing.sm}>
            {children}
        </input>
    );
};

const PasswordData = ({ account, toggleModal }) => {
    const { classes, theme } = useStyles();

    // Hooks
    const [showPassword, setShowPassword] = useState(false);
    const { vault, setVault } = useContext(VaultContext);
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md - 1}px)`);


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
    };

    const inputPasswordHandler = () => {
        if (!isMobile) return;
        showPasswordHandler();
    };

    const copyHandler = () => {
        if (vault.unlocked) {
            navigator.clipboard.writeText(account.password);
        } else {
            toggleModal();
        }
    };

    const iconSize = isTablet ? 20 : 24;
    return (
        <Group spacing="xl" className={classes.root}>
            <HiddenInput passwordHandler={inputPasswordHandler} value={showPassword && vault.unlocked ? account.password : "•••••••••••••••"} />
            <Group spacing="xs" className={classes.iconContainer}>
                <UnstyledButton onClick={showPasswordHandler}>
                    {showPassword && vault.unlocked ? <IconEye size={iconSize} stroke={2} /> : <IconEyeOff size={iconSize} stroke={2} />}
                </UnstyledButton>
                <UnstyledButton onClick={copyHandler}>
                    <IconCopy size={iconSize} stroke={2} />
                </UnstyledButton>
            </Group>
        </Group>
    );
};

export default PasswordData;
