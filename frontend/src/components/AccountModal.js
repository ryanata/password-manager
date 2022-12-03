import { forwardRef, useState, useEffect } from 'react';
import { Box, CloseButton, Modal, Badge, Loader, Title, MultiSelect, TextInput, PasswordInput, Text, Group, Button, Stack, createStyles } from '@mantine/core';
import ColorModal from './ColorModal';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTags } from '../helpers/Hooks';

const useStyles = createStyles((theme) => ({
}));


const SelectItem = forwardRef(({ label, color, mantineColor, newTag, ...others }, ref) => (
    <div ref={ref} {...others}>
        <Group position="left" noWrap>
            <Badge
                color={color}
                variant="filled"
                size="md"
                radius="sm"
            >
                {label}
            </Badge>
        </Group>
    </div>
));

const SelectedItem = forwardRef(({ label, color, mantineColor, newTag, onRemove, ...others }, ref) => {
    const clone = (({ classNames, styles, ...o }) => o)(others);
    return (
        <div ref={ref} {...clone}>
            <Group noWrap spacing={0} sx={{
                backgroundColor: mantineColor,
                borderRadius: 4,
                color: 'white',
                paddingLeft: 10,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: '12px',
            }}>
                <span>{label}</span>
                <CloseButton
                    aria-hidden
                    onMouseDown={onRemove}
                    size={22}
                    radius={2}
                    color="gray.0"
                    variant="transparent"
                    iconSize={11}
                    tabIndex={-1}
                />
            </Group>
        </div>
)});


const AccountModal = ({opened, closed}) => {
    // Hooks
    const { classes, theme } = useStyles();
    const [newTag, setNewTag] = useState({});
    const [alert, setAlert] = useState("");
    const { id } = useParams();
    const [selectedTags, setSelectedTags] = useState([]);
    const { data, isLoading, isError } = useTags(id);
    const [tags, setTags] = useState([]);
    const form = useForm({
        initialValues: {
            url: '',
            name: '',
            username: '',
            password: '',
        }
    });

    useEffect(() => {
        if (form.values.url.length > 6 && !form.values.name && form.values.url.includes('.')) {
            // if www. is in the url, set the name to the url without www.
            if (form.values.url.includes('www.')) {
                const noWWW = form.values.url.split('www.')[1];
                // set the name to noWWW without the everything after the last period and capitalize the first letter
                form.setFieldValue('name', noWWW.split('.')[0].charAt(0).toUpperCase() + noWWW.split('.')[0].slice(1));
            } else if (form.values.url.includes('https://')) {
                const noHTTPS = form.values.url.split('https://')[1];
                form.setFieldValue('name', noHTTPS.split('.')[0].charAt(0).toUpperCase() + noHTTPS.split('.')[0].slice(1));
            } else {
                form.setFieldValue('name', form.values.url.split('.')[0].charAt(0).toUpperCase() + form.values.url.split('.')[0].slice(1));
            }
        }
    }, [form.values.url]);


    const formHandler = (values) => {
        // Create a new account and double check that the tags array don't have duplicate object with another name
        
        // Selected tags is an array of strings
        // Check if they're duplicates in the array
        const seen = selectedTags.filter((s => v => s.has(v) || !s.add(v))(new Set));

        if (seen.length > 0) {
            setAlert("Duplicate tag: " + seen[0]);
            return;
        }

        const colors = selectedTags.map((tag) => {
            const tagObj = tags.find((t) => t.label === tag);
            return tagObj.color;
        });

        // Colors and selectedTags are the same length
        const formattedTags = selectedTags.map((tag, i) => {
            return {
                name: tag,
                color: colors[i],
            }
        });

        console.log(formattedTags);
        axios.post(`/api/vault/${id}/site/account`, {
            name: values.name,
            url: values.url,
            username: values.username,
            password: values.password,
            tags: formattedTags,
        }).then((res) => {
            console.log(res);
            closed();
        }).catch((err) => {
            setAlert(err.response.data.message);
        });
    };

    if (isLoading) {
        return (
            <Modal
                opened={opened}
                onClose={closed}
                title="Add Account"
                size="sm"
            >
                <Loader />
            </Modal>
        )
    }

    if (isError) {
        return (
            <Modal
                opened={opened}
                onClose={closed}
                size="sm"
                title="Error"
            >
                <Text>There was an error loading the tags</Text>
            </Modal>
        )
    }

    if (tags.length === 0 && data.tags.length > 0) {
        const formattedTags = data.tags.map((tag) => {
            return {
                label: tag.name,
                value: tag.name,
                color: tag.color,
                mantineColor: theme.colors[tag.color][6],
            }
        });
        setTags(formattedTags);
    }


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
                        placeholder='https://www.facebook.com/'
                        value={form.values.url}
                        required
                        {...form.getInputProps("url")}/>
                    <TextInput 
                        label="Name" 
                        placeholder='Facebook'
                        value={form.values.name}
                        required
                        {...form.getInputProps("name")}/>
                    <TextInput 
                        label="Username/Email" 
                        placeholder='john@gmail.com'
                        value={form.values.username}
                        required
                        {...form.getInputProps("username")}/>
                    <PasswordInput 
                        label="Password" 
                        placeholder='********'
                        value={form.values.password}
                        required
                        {...form.getInputProps("password")}/>
                    <MultiSelect
                        label="Tags"
                        placeholder="Pick all you like"
                        itemComponent={SelectItem}
                        valueComponent={SelectedItem}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        data={tags}
                        searchable
                        creatable
                        getCreateLabel={(query) => `Create tag "${query}"`}
                        onCreate={(query) => {
                            // TODO: If duplicate tag name, throw error and don't add
                            const item = { 
                                label: query,
                                color: 'blue',
                                mantineColor: theme.colors["blue"][6],
                                value: query,
                                newTag: true,
                            };
                            setNewTag(item);
                            return item;
                        }}
                        nothingFound="Nobody here"
                        maxDropdownHeight={400}
                        filter={(value, selected, item) =>
                            !selected &&
                            (item.label.toLowerCase().includes(value.toLowerCase().trim()))
                        }
                    />
                    <Modal
                        title={`Choose tag color for ${newTag?.label}`}
                        opened={opened && Object.keys(newTag).length !== 0}
                        centered
                        size="xs"
                        onClose={() => {
                            setTags((current) => [...current, newTag]);
                            setNewTag({});
                        }}
                        >
                            <ColorModal setTag={setNewTag} tag={newTag}/>
                    </Modal>
                </Stack>
                <Group mt="sm" position="apart">
                    <Text size="xs" color="red">
                        {alert && 
                        <Text weight={700} span={true}>
                            {"Error: "}
                        </Text>}
                        {alert}.
                    </Text>

                    <Group>
                        <Button
                            onClick={closed}
                            variant="outline">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            Save
                        </Button>
                    </Group>

                </Group>
                
            </form>
            
        </Modal>
     );
}
 
export default AccountModal;