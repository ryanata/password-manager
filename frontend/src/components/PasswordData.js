import {
    createStyles,
    Group,
    UnstyledButton,
} from '@mantine/core'
import { IconCopy, IconEye, IconEyeOff } from '@tabler/icons'
import { useState } from 'react';

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

const HiddenInput = ({children, value}) => {
    const { classes, theme } = useStyles();
    return ( 
        <input 
            type="text" 
            readOnly
            value={value}
            className={classes.input}
            size={theme.spacing.sm}>
            {children}
        </input>
     );
}

const PasswordData = ({account, i}) => {
    const { classes, theme } = useStyles();
    const [show, setShow] = useState(false);

    return ( 
        <Group
            pt={i == 0 ? (32 + theme.spacing.sm) : theme.spacing.sm}
            spacing="xl"
            className={classes.passwordWrapper}
        >
            <HiddenInput
                value={show ? account.password : '•••••••••••••••'}
            />
            <Group 
                spacing="xs"
                className={classes.passwordWrapper}
            >
                <UnstyledButton>
                    {show ? <IconEye stroke={2}/> : <IconEyeOff stroke={2}/>}
                </UnstyledButton>
                <UnstyledButton>
                    <IconCopy stroke={2}/>
                </UnstyledButton>
            </Group>
        </Group>
     );
}
 
export default PasswordData;