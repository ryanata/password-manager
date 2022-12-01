import { createStyles, Box, Center, ColorSwatch, Stack, Group, Popover, CheckIcon } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
}));


const ColorModal = ({setTag, tag}) => {
    const { classes, theme } = useStyles();
    const [selectedColor, setSelectedColor] = useState("blue");

    const colors = Object.keys(theme.colors);
    const topColors = colors.slice(0, 7).map((color) => (
        <ColorSwatch 
            component="button" 
            radius="sm"
            size={34}
            m={2}
            key={color} 
            color={theme.colors[color][6]}
            onClick={() => {
                setSelectedColor(color);
                setTag({...tag, color: color, mantineColor: theme.colors[color][6]});
            }}
            sx={{ color: '#fff', cursor: 'pointer' }}
        >
            {(selectedColor == color) && <CheckIcon width={10} />}
        </ColorSwatch>
    ));
    const bottomColors = colors.slice(7, 14).map((color) => (
        <ColorSwatch 
            component="button" 
            radius="sm"
            size={34}
            m={2}
            key={color} 
            color={theme.colors[color][6]}
            onClick={() => {
                setSelectedColor(color);
                setTag({...tag, color: color, mantineColor: theme.colors[color][6]});
            }}
            sx={{ color: '#fff', cursor: 'pointer' }}
        >
            {(selectedColor == color) && <CheckIcon width={10} />}
        </ColorSwatch>
    ));

    return ( 
        <Box>
            <Center>
                <Stack spacing={0}>
                    <Group position="left" spacing={0} noWrap>
                        {topColors}
                    </Group>
                    <Group position="left" spacing={0} noWrap>
                        {bottomColors}
                    </Group>
                </Stack>
            </Center>
        </Box>
     );
}
 
export default ColorModal;