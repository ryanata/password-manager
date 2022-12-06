import { Button, Modal, PasswordInput, Stack, Text, TextInput, createStyles, Title, Group } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useStyles = createStyles((theme) => ({
    link: {
        color: theme.colors.blue[6],
        textDecoration: "none",
        "&:hover": {
            opacity: 0.8,
        },
    },

    modalSubheader: {
        marginBottom: theme.spacing.xl,
        lineHeight: 1.15,
    },
}));

const EditAccountModal = ({ opened, closed, user }) => {
    // Styling
    const { classes, theme } = useStyles();

    // Hooks
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const queryClient = useQueryClient();

    const form = useForm({
        initialValues: {
            firstName: user.name.firstName,
            lastName: user.name.lastName,
            email: user.email,
            phoneNumber: user.phone,
            error: "",
        },
        validate: {
            email: (value) => !value.includes("@") && "Invalid email",
        },
    });

    const formHandler = (values) => {
        axios.put(`/api/user/${user._id}/update`, {firstName: values.firstName, lastName: values.lastName, email: values.email, phoneNumber: values.phoneNumber})
            .then((res) => {
                closed();
                queryClient.invalidateQueries(["getUser"]);
            })
            .catch((err) => {
                form.setFieldError("error", "An error occurred. Please try again later.");
                console.log(err.response.data.message);
            }
        )
    };

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
                    marginBottom: 12,
                    fontSize: "20px",
                },
            }}
            padding="lg"
            title={"Edit Account"}
        >
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack>
                <Group position="center" spacing="sm" grow pt>
                        <TextInput
                            required={true}
                            label="First Name"
                            placeholder="John"
                            value={form.values.firstName}
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            required={true}
                            label="Last Name"
                            placeholder="Doe"
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
                        placeholder="1234567890"
                        value={form.values.phoneNumber}
                        {...form.getInputProps("phoneNumber")}
                    />
                    <Button
                        type="submit"
                        variant="filled"
                        fullWidth
                    >
                        Done
                    </Button>
                </Stack>
                <Text color="red" size="xs">{form.values.error}</Text>
            </form>
        </Modal>
    );
};

export default EditAccountModal;

