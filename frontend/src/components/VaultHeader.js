import {Grid, Group, Center, Text, UnstyledButton, createStyles} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },
    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

const Icons = {
    ascending: IconChevronUp,
    descending: IconChevronDown,
    unsorted: IconSelector,
};

// Header
const NameHeader = ({ children, sort, onSort }) => {
    const { classes } = useStyles();
    const Icon = Icons[sort];
    return (
        <div className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group spacing={4}>
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </div>
    );
};

const VaultHeader = ({sort, toggleSort}) => {
    return ( 
        <Grid>
            <Grid.Col span={5}>
                <NameHeader
                    sort={sort}
                    onSort={() => {
                        toggleSort();
                    }}>
                    NAME
                </NameHeader>
            </Grid.Col>

            <Grid.Col span={4}>
                <Group sx={{ height: "100%"}}>
                    <Text weight={500} size="sm" align="left">
                        TAGS
                    </Text>
                </Group>      
            </Grid.Col>

            <Grid.Col span={3}>
                <Group sx={{ height: "100%"}}>
                    <Text weight={500} size="sm" align="left">
                        PASSWORD
                    </Text>
                </Group>      
            </Grid.Col>
        </Grid>
     );
}
 
export default VaultHeader;