import { useState } from "react"
import { Text, Paper, Title, Button, Slider, Container, Grid, Space, Checkbox, UnstyledButton, Group, Divider } from '@mantine/core';
import { IconCopy } from "@tabler/icons";
import { PasswordStrength } from "./StrengthMeter";

const PasswordGenerator = () => {

    const [password, setPassword] = useState('')
    
    const generatePassword = () => {
        const password = Math.random().toString(36).slice(-10)
        setPassword(password)
    }
    const [value, setValue] = useState(10);
    const [endValue, setEndValue] = useState(10);

    const copyHandler = () => {
        navigator.clipboard.writeText(password);
    };
    
    return (
        <Container>
            <Space h="xl" />
            <Title>Password Generator</Title>
            <Space h="lg" />
            <PasswordStrength password={password} />
            <Paper shadow="xs" p="lg" radius="sm" px="xl">
                <Group position="apart">
                    <Title order={3}>
                    {password}
                    </Title>
                    <UnstyledButton onClick={copyHandler}>
                        <IconCopy size="30" stroke={2} />
                    </UnstyledButton>
                </Group>
            </Paper>
            <Space h="md" />
            <Paper shadow="xs" py="lg" radius="sm">
                <Text size="lg" align="left" pl="xl">Customize Password</Text>
                <Divider mx="lg" my="md"/>
                <Grid>
                    <Grid.Col span={6}>
                        <Container size={400} pt="sm">
                            <Slider value={value} min={8} max={20} onChange={setValue} onChangeEnd={setEndValue} />
                            <Text mt="md" size="sm">
                                Password Length: <b>{value}</b>
                            </Text>
                        </Container>
                    </Grid.Col>
                    <Grid.Col span={4} offset={0.5}>
                        <Checkbox.Group
                        defaultValue={['react']}
                        orientation="vertical"
                        size="md"
                        >
                            <Checkbox value="react" label="Lowercase" />
                            <Checkbox value="svelte" label="Uppercase" />
                            <Checkbox value="ng" label="Numbers" />
                            <Checkbox value="vue" label="Symbols" />
                        </Checkbox.Group>
                    </Grid.Col>
                </Grid>
            </Paper>
            <Space h="xl" />
            <Button size="md" onClick={generatePassword}>Generate Password</Button>
        </Container>
    )
}

export default PasswordGenerator