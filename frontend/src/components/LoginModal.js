import {
    createStyles,
    Anchor,
    Button,
    Checkbox,
    Group,
    Modal,
    PasswordInput,
    Stack,
    Title,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme) => ({
    link: {
        color: theme.colors.blue[6],
        textDecoration: 'none',
        '&:hover': {
            opacity: 0.8,
        },
    },
    modalHeader: {
        fontSize: '40px',
    },
    modalSubheader: {
        marginBottom: theme.spacing.xl,
    },
}));

const LoginModal = ({ opened, closed }) => {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validate: {
            email: (value) => !value.includes('@') && 'Invalid email',
        }
    });

    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={closed}
            styles={{
                header: {
                    marginBottom: 0,
                }
            }}
            padding="md">
                <Title order={1} align="center" className={classes.modalHeader}>Welcome back!</Title>
                <Text align="center" color={theme.colors.gray[6]} className={classes.modalSubheader}>Don’t have an account yet? <span className={classes.link}>Create account</span></Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack>
                        <TextInput 
                            required={true}
                            label="Email"
                            placeholder="john.doe@gmail.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}/>

                        <PasswordInput 
                            required={true}
                            label="Password"
                            placeholder="********"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}/>
                        
                        <Group position="apart" mb="lg">
                            <Checkbox
                                label="Remember Me"
                                checked={form.values.remember}
                                onChange={(event) => form.setFieldValue('remember', event.currentTarget.checked)}/>
                            <Anchor size="sm">Forgot Password?</Anchor>
                        </Group>

                        <Button type="submit" size='md'>Sign in</Button>
                        
                        
                    </Stack>

                </form>
        </Modal>
      );
}
 
export default LoginModal;