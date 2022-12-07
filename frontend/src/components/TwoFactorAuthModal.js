import { Button, Group, Title,Text, Modal, Radio, Stack, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";

import PinInput from "./PinInput";
import axios from "axios";
const useStyles = createStyles((theme) => ({
    body: {
        height: theme.breakpoints.xs,
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
    smallText: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.gray[7],
    },
}));

const TwoFactorAuthModal = ({opened, closed, origin}) => {
    const { classes, theme } = useStyles();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);
    const [submittedMethod, setSubmittedMethod] = useState(false);
    const [verifyMethod, setVerifyMethod] = useState("phone");
    const [data, setData] = useState({});


    const onClose = () => {
        // Reset states
        setSubmittedMethod(false);
        setData({});
        // Close modal
        closed();
    };

    const maskPhone = (phone) => {
        if (!phone) return "";
        const phoneAsString = phone.toString();
        // Regex to mask phone number with asterisks
        const masked = phoneAsString.replace(/.(?=.{4})/g, "*");
        // Convert to format (xxx) xxx-xxxx
        return `(${masked.slice(0, 3)}) ${masked.slice(3, 6)}-${masked.slice(6, 10)}`;
    };

    const maskEmail = (email) => {
        if (!email) return "";
        // Get the first part of the email
        const firstPart = email.split("@")[0];
        // Get the last part of the email
        const lastPart = email.split("@")[1];
        // Regex to mask the first part of the email with asterisks except the first two characters
        const masked = firstPart.length > 3 ? firstPart.replace(/(?<=...)./g, "*") : firstPart.replace(/(?<=.)./g, "*");
        // Return the masked email
        return `${masked}@${lastPart}`;
    };

    const sendCodeHandler = (contact) => {
        // Indicate that the user has submitted the method
        setSubmittedMethod(true);
        // Send code to chosen method
        // axios
        //     .post(`api/verification/${contact}/?medium=${verifyMethod}&type=default`)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };



    useEffect(() => {
        // Set data to origin.data when opened is true
        if (opened) {
            setData(origin.data);
        }
    }, [opened]);

    const contact = (verifyMethod === "phone" && data) ? `1${data.phoneNumber}` : data.email;
    const jwt = data?.token;
    return ( 
            <Modal
                centered={true}
                opened={opened}
                onClose={onClose}
                fullScreen={isMobile}
                size="md"
                radius={theme.radius.md}
                title={!submittedMethod && "For your security, please verify your identity"}
                styles={{
                    header: {
                        marginBottom: submittedMethod ? theme.spacing.xl : theme.spacing.xl * 1.5,
                    },
                }}
                padding="lg">
                    {submittedMethod ?
                    <>  
                        <PinInput closeModal={onClose} verifyMethod={verifyMethod} verifyContact={contact} jwt={jwt}/>
                    </>
                    :
                    <Stack spacing={75}>
                        <Stack spacing={38}>
                            <Title align="center">
                                How would you like to get your security code?
                            </Title>
                            <Radio.Group 
                                value={verifyMethod}
                                onChange={setVerifyMethod}
                                orientation="vertical"
                                size="md"
                                pl="lg">
                                <Radio value="phone" label={"Text message code to " + maskPhone(data.phoneNumber)} />
                                <Radio value="email" label={"Email code to " + maskEmail("doggosarus@gmail.com")}/>
                            </Radio.Group>
                        </Stack>
                        <Stack spacing="lg">
                            <Group position="apart">
                                <Button className={classes.cancelButton} onClick={() => onClose()}>Cancel</Button>
                                <Button className={classes.submitButton} onClick={() => {sendCodeHandler(contact)}}>Send code</Button>
                            </Group>
                        </Stack>
                    </Stack>
                    }

            </Modal>
     );
}
 
export default TwoFactorAuthModal;