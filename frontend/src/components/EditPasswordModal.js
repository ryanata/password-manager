import { Button, Group, Modal, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

const EditPasswordModal = ({ opened, closed, user }) => {
    const form = useForm({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
        },
    });

    const formHandler = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            form.setFieldValue("error", "Passwords do not match");
        } else {
            axios
                .put(`/api/user/${user._id}/update`, {
                    oldPassword: values.currentPassword,
                    password: values.newPassword,
                })
                .then((res) => {
                    if (res.status === 200) {
                        closed();
                    }
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        form.setFieldValue("error", "Incorrect password");
                    } else {
                        form.setFieldValue("error", "An unexpected error occured. Please try again later");
                    }
                });
        }
    };

    return (
        <Modal
            centered
            opened={opened}
            onClose={closed}
            size="sm"
            radius="md"
            styles={{
                header: {
                    marginBottom: 12,
                    fontSize: "20px",
                },
            }}
            padding="lg"
            title={"Change Password"}
        >
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack spacing="md">
                    <PasswordInput required label="Current Password" {...form.getInputProps("currentPassword")} />
                    <PasswordInput required label="New Password" {...form.getInputProps("newPassword")} />
                    <PasswordInput required label="Confirm New Password" {...form.getInputProps("confirmPassword")} />
                </Stack>

                <Group position="right">
                    <Button type="submit" variant="filled" my="sm" fullWidth>
                        Update
                    </Button>
                </Group>

                <Text color="red">{form.values.error}</Text>
            </form>
        </Modal>
    );
};

export default EditPasswordModal;
