import { Button, Center, Modal, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import { createVault } from "../helpers/Hooks";

const WelcomeModal = ({ userId }) => {
    const [error, setError] = useState("");

    const form = useForm({
        initialValues: {
            password: "",
        },
        validate: {
            password: (value) => value.length < 8 && "Password must be at least 8 characters",
        },
    });

    const formHandler = (values) => {
        createVault(userId, "Personal", values.password)
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    console.log("Welcome to pwdly!");
                    // Reload the page
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error creating vault, please try again.");
            });
    };

    return (
        <Modal
            opened={true}
            onClose={() => {}}
            size={500}
            centered
            transition="slide-down"
            transitionDuration={200}
            transitionTimingFunction="ease"
            withCloseButton={false}
        >
            <Center>
                <Title>Welcome to pwdly!</Title>
            </Center>
            <Text mt="lg" mb="lg">
                To get started, create a password for your{" "}
                <Text span weight={700}>
                    personal vault.
                </Text>
            </Text>
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack spacing="xl">
                    <PasswordInput required label="Master Password" {...form.getInputProps("password")} />
                    <Button type="submit">Submit</Button>
                </Stack>
                <Text color="red">{error}</Text>
            </form>
        </Modal>
    );
};

export default WelcomeModal;
