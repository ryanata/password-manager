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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
    link: {
        color: theme.colors.blue[6],
        textDecoration: "none",
        "&:hover": {
            opacity: 0.8,
        },
    },
    modalHeader: {
        fontSize: "40px",
    },
    modalSubheader: {
        marginBottom: theme.spacing.xl,
        lineHeight: 1.15,
    },
}));

const SignupModal = ({ opened, closed }) => {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={closed}
            fullScreen={isMobile}
            size="sm"
            radius={theme.radius.md}
            styles={{
                header: {
                    marginBottom: 0,
                },
            }}
            padding="lg"
        >
            <Title order={1} align="center" className={classes.modalHeader}>
                Create your account
            </Title>
            <Text align="center" color={theme.colors.gray[6]} className={classes.modalSubheader}>
                {"Already have an account? "}
                <Anchor>Log in</Anchor>
            </Text>
            <form>
                <Stack>
                    <Group position="center" spacing="sm" grow>
                        <TextInput
                            required={true}
                            label="First name"
                            placeholder="john"
                            // value={form.values.email}
                            // onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            // error={form.errors.email && "Invalid email"}
                        />
                        <TextInput
                            required={true}
                            label="Last name"
                            placeholder="doe"
                            // value={form.values.email}
                            // onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            // error={form.errors.email && "Invalid email"}
                        />
                    </Group>
                    <TextInput
                        required={true}
                        label="Email"
                        placeholder="john.doe@gmail.com"
                        // value={form.values.email}
                        // onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                        // error={form.errors.email && "Invalid email"}
                    />

                    <PasswordInput
                        required={true}
                        label="Password"
                        placeholder="********"
                        // value={form.values.password}
                        // onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                    />

                    <Button
                        type="submit"
                        // onClick={() => form.setFieldValue("submittingLogin", true)}
                        size="md"
                        mb="sm"
                    >
                        Sign up
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default SignupModal;
