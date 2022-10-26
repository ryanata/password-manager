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

const LoginModal = ({ opened, closed }) => {
    const { classes, theme } = useStyles();
    const [forgotPassword, setForgotPassword] = useState(false);
    const [submitPasswordReq, setSubmitPasswordReq] = useState("");

    // isMobile is a hook that is true on mobile screen sizes. Equivalent to theme.fn.smallerThan("sm")
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const onClose = () => {
        // Triggers css display: none
        closed();
        // Waits 0.4 second because of the animation delay
        setTimeout(() => {
            setForgotPassword(false);
        }, 400);
    };

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
            submittingLogin: null,
        },
        validate: {
            email: (value) => !value.includes("@") && "Invalid email",
        },
    });

    const formHandler = (values) => {
        // If submitting the login form
        if (values.submittingLogin) {
            // TODO: Send login request to backend

            // Close modal
            onClose();
        } else {
            // TODO: Send forgot password request to backend

            setSubmitPasswordReq(values.email);
        }

        // Reset form
        form.reset();
    };

    const redirectLoginHandler = () => {
        setForgotPassword(false);
        setSubmitPasswordReq("");
        form.reset();
    };

    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={onClose}
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
            <Title order={1} align="center" mb={forgotPassword && "xs"} className={classes.modalHeader}>
                {forgotPassword ? "Reset password" : "Welcome back!"}
            </Title>
            <Text align="center" color={theme.colors.gray[6]} className={classes.modalSubheader}>
                {forgotPassword
                    ? "Enter your account's email address and we'll send you a link to reset your password."
                    : "Don’t have an account yet?"}{" "}
                {!forgotPassword && <Anchor>Create account</Anchor>}
            </Text>
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack>
                    <TextInput
                        required={true}
                        label="Email"
                        placeholder="john.doe@gmail.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                        error={form.errors.email && "Invalid email"}
                    />

                    {!forgotPassword && (
                        <PasswordInput
                            required={true}
                            label="Password"
                            placeholder="********"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                        />
                    )}

                    {!forgotPassword && (
                        <Group position="apart" mb="xl">
                            <Checkbox
                                label="Remember Me"
                                checked={form.values.remember}
                                onChange={(event) => form.setFieldValue("remember", event.currentTarget.checked)}
                            />
                            <Anchor size="sm" onClick={setForgotPassword}>
                                Forgot Password?
                            </Anchor>
                        </Group>
                    )}

                    {forgotPassword ? (
                        <Button
                            type="submit"
                            onClick={() => form.setFieldValue("submittingLogin", false)}
                            size="md"
                            mb="sm"
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            onClick={() => form.setFieldValue("submittingLogin", true)}
                            size="md"
                            mb="sm"
                        >
                            Sign in
                        </Button>
                    )}

                    {forgotPassword && submitPasswordReq && (
                        <Text size="xs">
                            Sent password reset to {submitPasswordReq}.{" "}
                            <Anchor onClick={redirectLoginHandler}>Back to login</Anchor>
                        </Text>
                    )}
                </Stack>
            </form>
        </Modal>
    );
};

export default LoginModal;
