import { Button, Group, Modal, PasswordInput, Text, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";

import { VaultContext } from "../helpers/Hooks";

const useStyles = createStyles((theme) => ({}));
const MasterPasswordModal = ({ opened, closed }) => {
    // Styling
    const { classes, theme } = useStyles();

    // Hooks
    const form = useForm({
        initialValues: {
            password: "",
            error: "",
        },
    });
    const { vault, setVault } = useContext(VaultContext);
    const [alert, setAlert] = useState("");

    // Handlers
    const formHandler = async (values) => {
        // TODO: Send request to backend

        // This is mocking a successful response
        if (values.password === "djkhaled") {
            // Set vault.unlocked to true
            setVault({
                ...vault,
                unlocked: true,
            });
            // Close modal
            closed();
        } else {
            // Set error message
            setAlert("Incorrect password");
        }
    };

    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={closed}
            size="sm"
            radius="md"
            styles={{
                header: {
                    marginBottom: 0,
                },
            }}
            padding="lg"
        >
            <form onSubmit={form.onSubmit((values) => formHandler(values))}>
                <PasswordInput label="Master password" {...form.getInputProps("password")} />
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
                <Text color="red">{alert}</Text>
            </form>
        </Modal>
    );
};

export default MasterPasswordModal;
