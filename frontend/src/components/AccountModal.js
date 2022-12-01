import { forwardRef, useState, useEffect } from 'react';
import { Box, CloseButton, Modal, Badge, Title, MultiSelect, TextInput, PasswordInput, Group, Button, Stack, createStyles } from '@mantine/core';
import PopoverColors from './PopoverColors';
import { useForm } from '@mantine/form';

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
    const { classes, theme } = useStyles();
    const [newTag, setNewTag] = useState({});
    const [tags, setTags] = useState([
        {
            label: 'Tag 1',
            color: "gray",
            mantineColor: theme.colors["gray"][6],
            value: 'Tag 1',
        },
        {
            label: 'Tag 2',
            color: "red",
            mantineColor: theme.colors["red"][6],
            value: 'Tag 2',
        },
        {
            label: 'Tag 3',
            color: 'yellow',
            mantineColor: theme.colors["yellow"][6],
            value: 'Tag 3',
        },
    ]);

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


    const onClose = () => {
        closed();
        form.reset();
    };

    return ( 
        <Modal
            title="Create new account"
            opened={opened}
            onClose={onClose}
            size="sm"
            styles={(theme) => ({
                root: {
                    padding: 20,
                },
            })}
        >
            <form>
                <Stack>
                    <TextInput 
                        label="Website URL" 
                        placeholder='https://www.facebook.com/'
                        value={form.values.url}
                        {...form.getInputProps("url")}/>
                    <TextInput 
                        label="Name" 
                        placeholder='facebook.com'
                        value={form.values.name}
                        {...form.getInputProps("name")}/>
                    <TextInput 
                        label="Username/Email" 
                        placeholder='john@gmail.com'
                        value={form.values.username}
                        {...form.getInputProps("username")}/>
                    <PasswordInput 
                        label="Password" 
                        placeholder='********'
                        value={form.values.password}
                        {...form.getInputProps("password")}/>
                    <MultiSelect
                        label="Tags"
                        placeholder="Pick all you like"
                        itemComponent={SelectItem}
                        valueComponent={SelectedItem}
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
                            <PopoverColors setTag={setNewTag} tag={newTag}/>
                    </Modal>
                </Stack>
            </form>
            
        </Modal>
     );
}
 
export default AccountModal;