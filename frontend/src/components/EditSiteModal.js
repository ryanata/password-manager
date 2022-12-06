import { useState, useRef } from 'react';
import { ActionIcon, Box, Modal, Divider, Title, TextInput, PasswordInput, Text, Group, Button, Stack, createStyles} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { updateSite } from '../helpers/Hooks';
import { useQueryClient } from '@tanstack/react-query';
import MultiInput from './MultiInput';
import DeleteWarning from './DeleteWarning';
import { IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
}));

const EditModal = ({site, opened, closed}) => {
    // Hooks
    const { classes, theme } = useStyles();
    const { id } = useParams();
    const [alert, setAlert] = useState("");
    // Get ref of form
    const formRef = useRef(null);
    const [warningOpened, { toggle: toggleWarning }] = useDisclosure(false);
    const queryClient = useQueryClient();
    const queryTags = `getTags_${id}`;
    const queryVault = `getVault_${id}`;

    // Store all the accounts in an object with the account._id as the key
    const initialAccounts = {};
    site.accounts.forEach(account => {
        initialAccounts[account._id] = account;
    });

    const form = useForm({
        initialValues: {
            name: site.name,
            url: site.url,
            ...initialAccounts,
        },
    });

    const changeSelectedTags = (id) => {
        const updateTags = (selectedTags) => {
            const account = {
                ...form.values[id],
                tags: selectedTags
            }
            form.setFieldValue(id, account);
        }
        return updateTags;
    }

    const formHandler = (values) => {
        const nonDeletedAccounts = site.accounts.filter(account => {
            return !(values[account._id].deleted);
        }).map(account => {
            return {
                username: values[account._id].username,
                password: values[account._id].password,
                tags: values[account._id].tags,
                _id: account._id,
            }
        });
        updateSite(id, site.name, values.name, values.url, nonDeletedAccounts)
        .then((res) => {
            closed();
            queryClient.invalidateQueries([queryTags]);
            queryClient.invalidateQueries([queryVault]);
        }).catch((err) => {
            setAlert(err.response.data.message);
        });
    };

    const deleteAccount = (id) => {
        const acc = form.values[id];
        if (acc.deleted) {
            form.setFieldValue(id, {...acc, deleted: false});
        } else {
            form.setFieldValue(id, {...acc, deleted: true});
        }
    }

    // Check if any object in form.values has a deleted property and save it as a boolean
    const hasDeleted = Object.values(form.values).some(account => account.deleted);
    return ( 
        <Modal 
            title={`Editing ${site.name}`}
            opened={opened} 
            onClose={closed}
            closeOnClickOutside={false}
            size="lg"
            overflow="inside"
            styles={(theme) => ({
                root: {
                    padding: 20,
                },
            })}
        >
            <Box pr="lg">
                <form ref={formRef} onSubmit={form.onSubmit(formHandler)}>
                    <Stack spacing="sm">
                        <Title order={3}>Site Information</Title>
                        <TextInput
                            label="Name"
                            placeholder="Name"
                            required
                            value={form.values.name}
                            {...form.getInputProps("name")}
                        />
                        <TextInput
                            label="URL"
                            placeholder="URL"
                            required
                            value={form.values.url}
                            {...form.getInputProps("url")}
                        />
                        <Divider />
                        <Title order={3}>Accounts</Title>
                        {site.accounts.map((account) => {
                            return (
                                <div key={account._id}>
                                    <Stack spacing="sm" p="sm" sx={{
                                        backgroundColor: form.values[account._id].deleted ? theme.colors.red[1] : theme.colors.gray[0],
                                    }}>
                                        <Stack spacing={0}>
                                            <Group position="right" m={0} p={0}>
                                                <ActionIcon variant='light' onClick={() => {
                                                    console.log("Delete");
                                                    deleteAccount(account._id);
                                                }}>
                                                    <IconTrash size={16}/>
                                                </ActionIcon>
                                            </Group>
                                            <TextInput
                                                label="Username/Email"
                                                placeholder="john@gmail.com"
                                                required
                                                value={form.values[account._id].username}
                                                {...form.getInputProps(account._id + ".username")}
                                            />
                                        </Stack>
                                        <PasswordInput
                                            label="Password"
                                            placeholder="********"
                                            required
                                            value={form.values[account._id].password}
                                            {...form.getInputProps(account._id + ".password")}
                                        />
                                        <MultiInput
                                            preSelectedTags={account.tags}
                                            updateForm={changeSelectedTags(account._id)}
                                        />
                                    </Stack>
                                    <Divider my="xs"/>
                                </div>
                            )
                        })}
                    </Stack>
                    <Group position="right" mt="md">
                        {hasDeleted ?
                            <Button onClick={toggleWarning}>Save</Button>
                            :
                            <Button type="submit">Save</Button>
                        }
                    </Group>
                    <Text size="xs" color="red">
                        {alert}
                    </Text>
                    {warningOpened && 
                    (<DeleteWarning
                        opened={warningOpened}
                        closed={toggleWarning}
                        label="Are you sure you want to delete these accounts?"
                    >
                        <Group position="right" mt="sm">
                            <Group spacing="xs">
                                <Button variant="outline" onClick={toggleWarning}>No</Button>
                                <Button onClick={() => {
                                    // Close Modal
                                    toggleWarning();
                                    // Submit form
                                    formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                                }}>Yes</Button>
                            </Group>
                        </Group>
                    </DeleteWarning>)}
                </form>
            </Box>
        </Modal>
     );
}
 
export default EditModal;