import {
    Anchor,
    Button,
    Checkbox,
    Group,
    Loader,
    Modal,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useReducer, useState } from "react";
import { Navigate } from "react-router-dom";
import TwoFactorAuthModal from "./TwoFactorAuthModal";

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

const LoginModal = ({ opened, closed, openSignupModal }) => {
    // Styling
    const { classes, theme } = useStyles();

    // Hooks
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
        forgotPassword: false,
        alert: "",
        twoFactorAuthEnabled: false
    });
    const [user, setUser] = useState({});
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
            submittingLogin: null,
            loggedIn: null,
        },
        validate: {
            email: (value) => !value.includes("@") && "Invalid email",
        },
    });

    // Modal close handler
    const onClose = () => {
        // Triggers css display: none
        closed();
        // Waits 0.4 second because of the animation delay
        setTimeout(() => {
            setState({ forgotPassword: false, alert: "", twoFactorAuthEnabled: false });
        }, 400);
    };

    const formHandler = (values) => {
        // If submitting the login form
        if (values.submittingLogin) {
            // Call login api
            axios
                .post("/api/user/login", {
                    email: values.email,
                    password: values.password,
                })
                .then((res) => {
                    // If login successful
                    if (res.status === 200) {
                        const twoFactorAuth = res.data.user.twoFactorAuthEnabled;
                        localStorage.setItem("pwdlyToken", JSON.stringify(res.data.user.token));

                        // If two factor auth is enabled 
                        if (twoFactorAuth) {
                            setState({ twoFactorAuthEnabled: true });
                            setUser(res.data.user);
                        } else {
                            form.setFieldValue("loggedIn", true);
                        }
                    }
                })
                .catch((err) => {
                    // If login failed
                    if (err.response.status === 401) {
                        // Set alert message
                        setState({ alert: err.response.data.message });
                    } else {
                        // Set alert message
                        setState({ alert: "An error occured" });
                    }
                })
                .then(() => {
                    // Reset submittingLogin
                    form.setFieldValue("submittingLogin", null);
                });
        } else {
            axios
                .post("/api/user/forgotPassword", {
                    email: values.email,
                })
                .then((res) => {
                    setState({ alert: values.email });
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setState({ alert: "ERROR" });
                });
        }
    };

    const redirectToRegister = () => {
        // Close Modal
        onClose();
        // Open Register Modal
        openSignupModal();
    };

    
    if (state.twoFactorAuthEnabled) {
        return (
            <TwoFactorAuthModal opened={state.twoFactorAuthEnabled} closed={onClose} user={user}/>
        )
    };

    if (form.values.loggedIn) {
        return <Navigate to="/dashboard" />;
    }

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
            <Title order={1} align="center" mb={state.forgotPassword && "xs"} className={classes.modalHeader}>
                {state.forgotPassword ? "Reset password" : "Welcome back!"}
            </Title>
            <Text align="center" color={theme.colors.gray[6]} className={classes.modalSubheader}>
                {state.forgotPassword
                    ? "Enter your account's email address and we'll send you a link to reset your password."
                    : "Don’t have an account yet?"}{" "}
                {!state.forgotPassword && <Anchor onClick={redirectToRegister}>Create account</Anchor>}
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

                    {!state.forgotPassword && (
                        <PasswordInput
                            required={true}
                            label="Password"
                            placeholder="********"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                            error={form.errors.password && "Invalid password"}
                        />
                    )}

                    {!state.forgotPassword && (
                        <Group position="apart" mb="xl">
                            <Checkbox
                                label="Remember Me"
                                checked={form.values.remember}
                                onChange={(event) => form.setFieldValue("remember", event.currentTarget.checked)}
                            />
                            <Anchor
                                size="sm"
                                onClick={() => {
                                    setState({ forgotPassword: true, alert: "" });
                                }}
                            >
                                Forgot Password?
                            </Anchor>
                        </Group>
                    )}

                    {state.forgotPassword ? (
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
                            color="steel-blue"
                        >
                            {form.values.submittingLogin ? <Loader color="white" /> : "Login"}
                        </Button>
                    )}

                    {state.alert &&
                        (state.forgotPassword ? (
                            // Alert dialog on forgot password page
                            <Text size="xs">
                                Sent password reset to {state.alert}.{" "}
                                <Anchor
                                    onClick={() => {
                                        setState({ forgotPassword: false, alert: "" });
                                        form.reset();
                                    }}
                                >
                                    Back to login
                                </Anchor>
                            </Text>
                        ) : (
                            // Alert dialog on login page
                            <Text size="xs" color="red">
                                <Text weight={700} span={true}>
                                    Error:{" "}
                                </Text>
                                {state.alert}.
                            </Text>
                        ))}
                </Stack>
            </form>
        </Modal>
    );
};

export default LoginModal;
