import { useState, useEffect } from "react"
import { Alert, Text, Paper, Title, Button, Slider, Loader, Container, Grid, Space, Stack, Checkbox, UnstyledButton, Group, Divider } from '@mantine/core';
import { IconCopy } from "@tabler/icons";
import { PasswordStrength } from "./StrengthMeter";
import { getGeneratePassword } from "../helpers/Hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IconAlertCircle } from "@tabler/icons";

const PasswordGenerator = () => {
    const [length, setLength] = useState(10);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [alert, setAlert] = useState(false);
    // const { data: passwordObj, isLoading, isError, refetch } = useGenerator(length, numbers, symbols, uppercase, lowercase);
    const { data: passwordObj, isLoading, isError, refetch } = useQuery(
        [`generatePassword`, length, numbers, symbols, uppercase, lowercase], 
        () => getGeneratePassword(length, numbers, symbols, uppercase, lowercase),
        { refetchOnWindowFocus: false }
    );

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    }, [alert]);

    const copyHandler = () => {
        navigator.clipboard.writeText(password);
    };

    const checkOthers = (caller) => {
        const states = [lowercase, uppercase, numbers, symbols];
        // Check if every state in the array, except the caller index, is false
        return states.filter((state, index) => index !== caller).every((state) => state === false)
    }

    if (isError) {
        return <Text>Sorry, our password generator is not working right now 😞. Try refreshing this page.</Text>;
    }

    const password = isLoading ? "asjWR1" : passwordObj.password;
    return (
        <Container>
            <Space h="xl" />
            <Title>Password Generator</Title>
            <Space h="lg" />
            <PasswordStrength password={password} />
            <Paper shadow="xs" p="lg" radius="sm" px="xl">
                <Group position="apart">
                    {isLoading ? 
                        <Loader/>
                    :
                    <Title order={3}>
                        {password}
                    </Title>}
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
                            <Slider value={length} min={8} max={20} onChange={setLength} />
                            <Text mt="md" size="sm">
                                Password Length: <b>{length}</b>
                            </Text>
                        </Container>
                    </Grid.Col>
                    <Grid.Col span={4} offset={0.5}>
                        <Stack>
                            <Checkbox size="md" checked={lowercase} value="lowercase" label="Lowercase" onChange={(event) => {
                                if (checkOthers(0)) {
                                    setAlert(true);
                                } else {
                                    setLowercase(event.currentTarget.checked);
                                }
                            }}/>
                            <Checkbox size="md" checked={uppercase} value="uppercase" label="Uppercase" onChange={(event) => {
                                if (checkOthers(1)) {
                                    setAlert(true);
                                } else {
                                    setUppercase(event.currentTarget.checked);
                                }
                            }}/>
                            <Checkbox size="md" checked={numbers} value="numbers" label="Numbers" onChange={(event) => {
                                if (checkOthers(2)) {
                                    setAlert(true);
                                } else {
                                    setNumbers(event.currentTarget.checked);
                                }
                            }}/>
                            <Checkbox size="md" checked={symbols} value="symbols" label="Symbols" onChange={(event) => {
                                if (checkOthers(3)) {
                                    setAlert(true);
                                } else {
                                    setSymbols(event.currentTarget.checked);
                                }
                            }}/>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>
            <Space h="xl" />
            <Button size="md" onClick={() => {
                // refetch the data
                refetch();
            }}>Generate Password</Button>
            {alert && 
                (<Group position="right" pt="lg" mt="lg">
                    <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                        You must select at least one option.
                    </Alert>
                </Group>)}
        </Container>
    )
}

export default PasswordGenerator