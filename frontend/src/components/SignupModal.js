import {
    Anchor,
    Button,
    Group,
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
import { useState } from "react";
import { Navigate } from "react-router-dom";

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

const SignupModal = ({ opened, closed, openLoginModal }) => {
    // Styling
    const { classes, theme } = useStyles();

    // Hooks
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const [alert, setAlert] = useState("");

    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            loggedIn: false,
        },
        validate: {
            email: (value) => !value.includes("@") && "Invalid email",
        },
    });

    const formHandler = (values) => {
        axios
            .post("/api/user/register", {
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                // If login successful
                if (res.status === 201) {
                    // Redirect to dashboard
                    localStorage.setItem("pwdlyToken", JSON.stringify(res.data.user.token));
                    form.setFieldValue("loggedIn", true);
                }
            })
            .catch((err) => {
                // Set alert message
                setAlert(err.response.data.message);
            });
    };

    const redirectToLogin = () => {
        // Close Modal
        closed();
        // Open Login Modal
        openLoginModal();
    };

    if (form.values.loggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={closed}
            fullScreen={isMobile}
            size="md"
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
                <Anchor onClick={redirectToLogin}>Log in</Anchor>
            </Text>
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack>
                    <Group position="center" spacing="sm" grow>
                        <TextInput
                            required={true}
                            label="First name"
                            placeholder="john"
                            value={form.values.firstName}
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            required={true}
                            label="Last name"
                            placeholder="doe"
                            value={form.values.lastName}
                            {...form.getInputProps("lastName")}
                        />
                    </Group>
                    <TextInput
                        required={true}
                        label="Email"
                        placeholder="john.doe@gmail.com"
                        value={form.values.email}
                        {...form.getInputProps("email")}
                    />

                    <TextInput
                        required={true}
                        label="Phone number"
                        placeholder="john.doe@gmail.com"
                        value={form.values.phoneNumber}
                        {...form.getInputProps("phoneNumber")}
                    />

                    <PasswordInput
                        required={true}
                        label="Password"
                        placeholder="********"
                        value={form.values.password}
                        {...form.getInputProps("password")}
                    />

                    <Button
                        type="submit"
                        onClick={() => form.setFieldValue("submittingSignup", true)}
                        size="md"
                        mb="sm"
                    >
                        Sign up
                    </Button>
                    {alert && <Text color="red"> {alert}</Text>}
                </Stack>
            </form>
        </Modal>
    );
};

export default SignupModal;
