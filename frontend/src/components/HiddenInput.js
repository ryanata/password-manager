import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    input: {
        borderStyle: "none",
        fontSize: "inherit",
    },
}));

const HiddenInput = ({children, value}) => {
    const { classes, theme } = useStyles();
    return ( 
        <input 
            type="text" 
            readonly
            value={value}
            className={classes.input}
            size={theme.spacing.sm}>
            {children}
        </input>
     );
}
 
export default HiddenInput;