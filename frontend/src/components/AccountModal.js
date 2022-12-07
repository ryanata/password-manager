import { Button, Group, Modal, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MultiInput from "./MultiInput";

const AccountModal = ({ opened, closed }) => {
    // Hooks
    const [alert, setAlert] = useState("");
    const { id } = useParams();
    const form = useForm({
        initialValues: {
            url: "",
            name: "",
            username: "",
            password: "",
            tags: [],
        },
    });

    useEffect(() => {
        if (form.values.url.length > 6 && !form.values.name && form.values.url.includes(".")) {
            // if www. is in the url, set the name to the url without www.
            if (form.values.url.includes("www.")) {
                const noWWW = form.values.url.split("www.")[1];
                // set the name to noWWW without the everything after the last period and capitalize the first letter
                form.setFieldValue("name", noWWW.split(".")[0].charAt(0).toUpperCase() + noWWW.split(".")[0].slice(1));
            } else if (form.values.url.includes("https://")) {
                const noHTTPS = form.values.url.split("https://")[1];
                form.setFieldValue(
                    "name",
                    noHTTPS.split(".")[0].charAt(0).toUpperCase() + noHTTPS.split(".")[0].slice(1)
                );
            } else {
                form.setFieldValue(
                    "name",
                    form.values.url.split(".")[0].charAt(0).toUpperCase() + form.values.url.split(".")[0].slice(1)
                );
            }
        }
    }, [form.values.url]);

    const formHandler = (values) => {
        const selectedTags = values.tags;

        axios
            .post(`/api/vault/${id}/site/account`, {
                name: values.name,
                url: values.url,
                username: values.username,
                password: values.password,
                tags: selectedTags,
            })
            .then((res) => {
                console.log(res);
                closed();
            })
            .catch((err) => {
                setAlert(err.response.data.message);
            });
    };

    const updateTags = (selectedTags) => {
        form.setFieldValue("tags", selectedTags);
    };
    return (
        <Modal
            title="Create new account"
            opened={opened}
            onClose={closed}
            closeOnClickOutside={false}
            size="sm"
            styles={(theme) => ({
                root: {
                    padding: 20,
                },
            })}
        >
            <form onSubmit={form.onSubmit(formHandler)}>
                <Stack>
                    <TextInput
                        label="Website URL"
                        placeholder="https://www.facebook.com/"
                        value={form.values.url}
                        required
                        {...form.getInputProps("url")}
                    />
                    <TextInput
                        label="Name"
                        placeholder="Facebook"
                        value={form.values.name}
                        required
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Username/Email"
                        placeholder="john@gmail.com"
                        value={form.values.username}
                        required
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="********"
                        value={form.values.password}
                        required
                        {...form.getInputProps("password")}
                    />
                    <MultiInput updateForm={updateTags} />
                </Stack>
                <Group mt="sm" position="apart">
                    <Text size="xs" color="red">
                        {alert && (
                            <Text weight={700} span={true}>
                                {"Error: "}
                            </Text>
                        )}
                        {alert}.
                    </Text>

                    <Group>
                        <Button onClick={closed} variant="outline">
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </Group>
                </Group>
            </form>
        </Modal>
    );
};

export default AccountModal;
