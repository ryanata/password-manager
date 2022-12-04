import { forwardRef, useState, useEffect } from 'react';
import { Box, CloseButton, Modal, Badge, Loader, Title, MultiSelect, TextInput, PasswordInput, Text, Group, Button, Stack, createStyles } from '@mantine/core';
import ColorModal from './ColorModal';
import { useParams } from 'react-router-dom';
import { useTags } from '../helpers/Hooks';

const useStyles = createStyles((theme) => ({
}));


const SelectItem = forwardRef(({ label, color, mantineColor, ...others }, ref) => (
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

const SelectedItem = forwardRef(({ label, color, mantineColor, onRemove, ...others }, ref) => {
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


const MultiInput = ({preSelectedTags=[], updateForm, children, ...others}) => {
    // Hooks
    const { classes, theme } = useStyles();
    const [newTag, setNewTag] = useState({});
    const { id } = useParams();
    const [selectedTags, setSelectedTags] = useState([]);
    const { data, isLoading, isError } = useTags(id);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        // If selectedTags changed, check if selectedTags is in tags
        // If not, continue, the hook will come back when tags is updated
        // If so, update the form
        
        // Check that all strings in selectedTags are in tags.label
        const allIn = selectedTags.every((tag) => tags.map((t) => t.label).includes(tag));

        if (allIn) {
            const selectedTagObjects = selectedTags.map((tag) => {
                const tagObject = tags.find((t) => t.label === tag);
                return {
                    name: tagObject.label,
                    color: tagObject.color,
                }
            });
            updateForm(selectedTagObjects);
        }
    }, [selectedTags, tags]);


    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (isError) {
        return (
            <Text>There was an error loading the tags</Text>
        )
    }

    // Only run once on very first render (cheaper than useEffect)
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
        setSelectedTags(preSelectedTags.map((tag) => { return tag.name }));
    }

    return ( 
        <>
            <MultiSelect
                label="Tags"
                placeholder="Pick all you like"
                itemComponent={SelectItem}
                valueComponent={SelectedItem}
                value={selectedTags}
                onChange={(value) => {
                    setSelectedTags(value);
                }}
                data={tags}
                searchable
                creatable
                getCreateLabel={(query) => `Create tag "${query}"`}
                onCreate={(query) => {
                    // TODO: If duplicate tag name, throw error and don't add
                    const item = { 
                        label: query,
                        value: query,
                        color: 'blue',
                        mantineColor: theme.colors["blue"][6],
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
                title={`Choose tag color for ${newTag?.label ? newTag.label : 'your tag'}`}
                opened={Object.keys(newTag).length !== 0}
                centered
                size="xs"
                onClose={() => {
                    setTags((current) => [...current, newTag]);
                    setNewTag({});
                }}
                >
                    <ColorModal setTag={setNewTag} tag={newTag}/>
            </Modal>
        </>
     );
}
 
export default MultiInput;