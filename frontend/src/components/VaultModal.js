import { Button, Modal, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createVault } from "../helpers/Hooks";

const VaultModal = ({ opened, closed }) => {
    const queryClient = useQueryClient();
    const userId = queryClient.getQueryData(["getUser"]).data._id;
    
    const [error, setError] = useState("");
    const form = useForm({
        initialValues: {
            name: "",
            password: "",
        },
        validate: {
            password: (value) => value.length < 8 && "Password must be at least 8 characters",
        },
    });

    const formHandler = (values) => {
        createVault(userId, values.name, values.password)
            .then((res) => {
                if (res.status === 201) {
                    console.log("Vault created!");
                    // Close the modal
                    closed();
                    // Prefetch "getUser"
                    queryClient.prefetchQuery(["getUser"]);
                    queryClient.prefetchQuery(["getVaults"]);
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error creating vault, please try again.");
            });
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
                    marginBottom: 12,
                    fontSize: "25px",
                },
            }}
            padding="lg"
            title={"Create New Vault"}
        >

            <form onSubmit={form.onSubmit((values) => formHandler(values))}>
                <Stack>
                    <TextInput required label="Vault name" {...form.getInputProps("name")} />
                    <PasswordInput required label="Master password" {...form.getInputProps("password")} />
                    <Button mt="xs" type="submit">Submit</Button>
                </Stack>
                <Text color="red">{error}</Text>
            </form>
        </Modal>
    );
};

export default VaultModal;
