import {
    createStyles,
    Avatar,
    Chip,
    Group,
    Stack,
    Text,
    UnstyledButton,
} from '@mantine/core'
import { IconCopy, IconEye, IconEyeOff } from '@tabler/icons'
import HiddenInput from './HiddenInput';

const useStyles = createStyles((theme) => ({
    borderBottom: {
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
    tagsWrapper: {
        margin: 0,
        fontSize: theme.fontSizes.lg,
        flexWrap: 'nowrap',
        overflow: 'scroll',
    },
    passwordWrapper: {
        margin: 0,
        fontSize: theme.fontSizes.lg,
    },

}));


const PasswordTableRows = ({ children, data, showPassword, rowSpans}) => {
    const { classes, theme } = useStyles();
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
        )
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
                                    <Avatar size="32px" variant="outline" src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=${32}`} />
                                    <Text weight={500} size="xl">
                                        {site.name}
                                    </Text>
                                </Group>
                            </UnstyledButton>
                            {site.account.map((account, i) => (
                                /* Padding-left is calculated from Group padding left + Group flex spacing + avatar width */
                                <Text key={i} size="lg" color="gray-web" align="left" pl={theme.spacing.sm + theme.spacing.md + 32}>
                                    {account.username}
                                </Text>
                            ))}
                        </Stack>
                    </td>
                    {/* Tags */}
                    <td colSpan={rowSpans[1]} style={{overflow: 'hidden'}}>
                        {site.account.map((account, i) => (
                            /* For every account, create a scroll area and grid for the tags*/
                            <Group
                                key={i}
                                pt={i == 0 ? (32 + theme.spacing.sm) : theme.spacing.sm}
                                spacing="sm"
                                className={classes.tagsWrapper}>
                                {account.tags.map((tag, j) => (
                                            <Chip 
                                            type="radio"
                                            defaultChecked
                                            color="yellow" 
                                            variant="filled" 
                                            radius="sm" 
                                            key={j}
                                            styles={{ iconWrapper: {display: 'none'}}}>
                                                {tag}
                                            </Chip>
                                ))}
                            </Group>
                            )
                        )}
                    </td>
                    <td colSpan={rowSpans[2]}>
                        {site.account.map((account, i) => (
                            <Group
                                pt={i == 0 ? (32 + theme.spacing.sm) : theme.spacing.sm}
                                key={i}
                                spacing="xl"
                                className={classes.passwordWrapper}
                            >
                                <HiddenInput
                                    value={showPassword ? account.password : '•••••••••••••••'}
                                />

                                <Group 
                                    spacing="xs"
                                    className={classes.passwordWrapper}>
                                    <UnstyledButton>
                                        {showPassword ? <IconEye stroke={3}/> : <IconEyeOff stroke={3}/>}
                                    </UnstyledButton>
                                    <UnstyledButton>
                                        <IconCopy stroke={3}/>
                                    </UnstyledButton>
                                </Group>
                            </Group>
                            
                        ))}
                    </td>
                </tr>
            ))}
            {children}
        </tbody>
    );
}

export default PasswordTableRows;