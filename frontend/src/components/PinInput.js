import { Avatar, Box, Button, Center, NumberInput, Group, Stack, Text, Title, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Navigate } from "react-router-dom";
import { IconLock, IconLockOpen } from "@tabler/icons";

import { useRef, useCallback, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const useStyles = createStyles((theme) => ({
    formLayout: {
        display: "flex",
        flexDirection: "column",
        gap: 80,
    },
    buttonContainer: {
        width: "100%",
    },
    cancelButton: {
        backgroundColor: theme.colors.dark[1],
        color: "black",
        "&:hover": {
            backgroundColor: theme.colors.dark[2],
        },
        width: "48%",
        fontSize: theme.fontSizes.lg,
        fontWeight: 400,
    },
    submitButton: {
        width: "48%",
        fontSize: theme.fontSizes.lg,
        fontWeight: 400,
    },
    mediumText: {
        fontSize: theme.fontSizes.md,
        color: "red",
    },
    mediumGrayText: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray[7],
    },
}));

const Pin = ({ children, innerRef, next, ...rest }) => {
    const inputProps = {
        ref: innerRef,
        maxLength: 1,
        onInput: (e) => {
            if (e.target.value.length > 0) {
                next(); 
            }
        },
        ...rest
    };

    return (
        <NumberInput
                    hideControls
                    step={1}
                    wrapperProps={{ maxLength: 1}}
                    styles={{ input: { width: 45, height: 65, borderRadius: "15%", textAlign: 'center', fontSize: 28 }}}
                    {...inputProps}
        >
            {children}
        </NumberInput>
    );
};

const PinInput = ({closeModal, verifyMethod, verifyContact, jwt}) => {
    const { classes, theme } = useStyles();
    // Hooks
    const firstRef = useCallback(node => {
        if (node !== null) {
            console.log(node);
            // set timeout to overcome the animation delay
            setTimeout(() => node.focus(), 400);
        }
    }, []);
    const [dialog, setDialog] = useState("");
    const [success, setSuccess] = useState(false);
    const inputRefs = [firstRef, useRef(), useRef(), useRef(), useRef(), useRef()];


    const form = useForm({
        initialValues: {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
        },
    });

    const focusNextRef = (index) => {
        if (index == 5) {
            return () => {
                console.log("Done");
            };
        }
        return () => {
            inputRefs[index + 1].current.focus();
        }
    };
    
    const formHandler = (values) => {
        const pin = Object.values(values).join("");
        // For now just pretend that the pin is correct
        if (pin.length == 6) {
            setSuccess(true);
            localStorage.setItem("pwdlyToken", JSON.stringify(jwt));
        } else {
            setDialog("Invalid pin");
        }
        // axios.get(`api/verification/${verifyContact}/?code=${pin}&type=default&medium=${verifyMethod}`)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.status == 200) {
        //             localStorage.setItem("pwdlyToken", JSON.stringify(jwt));
        //             // setSuccess(true);
        //         } else {
        //             setDialog("Invalid PIN. Please try again.");
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data.message);
        //         setDialog("Invalid PIN. Please try again.");
        //     });
    };

    if (success) {
        return <Navigate to="/dashboard" />;
    }

    return ( 
        <Stack spacing={50}>
            <Stack spacing={0}>
                <Center>
                    <Avatar radius={"50%"} size="xl" variant="filled" color={dialog ? "red.0" : "cyan.0"}>
                        <IconLock size={64} color={dialog ? theme.colors.red[4] : theme.colors["steel-blue"][6]} stroke={0.8}/>
                    </Avatar>
                </Center>
                <Center>
                    <Title>Enter code</Title>
                </Center>
                <Center>
                    <Text className={classes.mediumGrayText}>
                        Enter the six digital code sent to your {verifyMethod}.
                    </Text>
                </Center>
            </Stack>
            <Box>
                <form onSubmit={form.onSubmit(formHandler)} className={classes.formLayout}>
                    <Group position="center">
                        {inputRefs.map((ref, index) => (
                            <Pin
                                key={index}
                                innerRef={ref}
                                next={focusNextRef(index)}
                                mr={index == 2 ? 40 : 0}
                                {...form.getInputProps(`${index + 1}`)}
                            />
                        ))}
                    </Group>
                    <Stack spacing="xs">
                        <Box sx={{height:25}}>
                            <Text className={classes.mediumText}>{dialog}</Text>
                        </Box>
                        <Group position="apart" className={classes.buttonContainer}>
                            <Button className={classes.cancelButton} onClick={() => closeModal()}>Cancel</Button>
                            <Button type="submit" className={classes.submitButton}>Verify</Button>
                        </Group>
                    </Stack>
                </form>
            </Box>
        </Stack>
     );
}
 
export default PinInput;